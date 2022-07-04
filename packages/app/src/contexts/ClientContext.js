import React, { createContext, useState, useEffect } from 'react';
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

const IGNORE_ERRORS = ['USER_ERROR', 'NOT_FOUND'];

export const ClientContext = createContext();

const setupApolloClient = uuid => {
  const httpLink = new HttpLink({
    uri: config.api.uri,
    headers: { 'X-UUID': uuid },
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
  const [uuid, setUuid] = useState();

  /* Get UUID for identifying user, generate if needed. */
  useEffect(() => {
    storage.load({ key: 'auth' }).then(authData => {
      if (authData.uuid) {
        setUuid(authData.uuid);
      } else {
        const generatedUuid = uuidv4();
        storage.save({ key: 'auth', data: { uuid: generatedUuid } });
        setUuid(generatedUuid);
      }
    });
  }, []);

  /* Setup apollo client once uuid is available */
  useEffect(() => {
    if (uuid) {
      setClient(setupApolloClient(uuid));
    }
  }, [uuid]);

  const updateUuid = value => {
    storage.save({ key: 'auth', data: { uuid: value } }).
      then(() => setUuid(value));
  };

  const value = { client, updateUuid };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContext;
