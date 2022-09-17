import React, { createContext, useState, useCallback, useEffect } from 'react';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { v4 as uuidv4 } from 'uuid';

import config from 'app/src/config';
import storage from 'app/src/utils/storage';
import { sendError } from 'app/src/components/ErrorBoundary';
import { CURRENT_USER } from 'app/src/components/Profile/queries';

const IGNORE_ERRORS = ['USER_ERROR', 'NOT_FOUND'];

export const ClientContext = createContext();

const setupApolloClient = ({ credentials, uuid }) => {
  let headers = {};

  if (credentials) {
    headers = {
      ...credentials,
      'access-token': credentials.accessToken,
    };
  } else if (uuid) {
    headers['X-UUID'] = uuid;
  }

  const httpLink = new HttpLink({
    headers,
    uri: config.api.uri,
  });

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors && graphQLErrors[0]) {
      if (!IGNORE_ERRORS.includes(graphQLErrors[0].extensions?.code)) {
        sendError({
          error: {
            name: 'GraphQL Error',
            message: graphQLErrors[0].message,
            stack: JSON.stringify(graphQLErrors),
          }
        });
      }
    }
  });

  const checkHeadersLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(data => {
      const context = operation.getContext();

      // TODO Native support
      if ('undefined' !== typeof(localStorage)) {
        if (context.response?.headers) {
          localStorage.setItem(
            'X-Request-Id',
            context.response.headers.get('X-Request-Id')
          );
        }
      }

      return data;
    });
  });

  return new ApolloClient({
    link: from([checkHeadersLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

export const ClientProvider = ({ children }) => {
  const [client, setClient] = useState();
  const [credentials, setCredentials] = useState();
  const [uuid, setUuid] = useState();
  const [currentUser, setCurrentUser] = useState();

  /* Generate a UUID, save to storage and set uuid */
  const generateUuid = useCallback(() => {
    const generatedUuid = uuidv4();
    storage.save({ key: 'auth', data: { uuid: generatedUuid } });
    setUuid(generatedUuid);
  }, []);

  /* Get Token or UUID for identifying user; generate UUID if needed. */
  useEffect(() => {
    storage.load({ key: 'auth' }).then(authData => {
      if (authData.credentials || authData.uuid) {
        setCredentials(authData.credentials);
        setUuid(authData.uuid);
      } else {
        generateUuid();
      }
    });
  }, []);

  /* Setup apollo client once credentials or uuid is available */
  useEffect(() => {
    if (credentials || uuid) {
      setClient(setupApolloClient({ credentials, uuid }));
    }
  }, [credentials, uuid]);

  useEffect(() => {
    if (client) {
      client.query({ query: CURRENT_USER }).then(({ data }) => {
        setCurrentUser(data.currentUser)
        if (!data.currentUser) {
          setCredentials(null);
        }
      });
    }
  }, [client]);

  const updateCredentials = value => {
    const data = { uuid, credentials: value };

    storage.save({ key: 'auth', data }).then(() => {
      if (credentials?.accessToken !== value?.accessToken) {
        setCredentials(value);
      }
    });
  };

  const updateUuid = value => {
    storage.save({ key: 'auth', data: { credentials, uuid: value } }).
      then(() => setUuid(value));
  };

  const refetchCurrentUser = useCallback(() => {
    client.query({ query: CURRENT_USER }).then(({ data }) => {
      setCurrentUser(data.currentUser)
    });
  }, [client]);

  const value = {
    client,
    currentUser,
    refetchCurrentUser,
    updateCredentials,
    updateUuid,
    isLoggedIn: !!credentials?.accessToken,
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContext;
