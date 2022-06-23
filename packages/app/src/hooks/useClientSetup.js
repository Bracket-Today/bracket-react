import { useEffect, useState } from 'react';
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

const useClientSetup = () => {
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
      const httpLink = new HttpLink({
        uri: config.api.uri,
        headers: { 'X-UUID': uuid },
      });

      const errorLink = onError(({ graphQLErrors }) => {
        if (graphQLErrors && graphQLErrors[0]) {
          if (graphQLErrors[0].extensions?.code !== 'USER_ERROR') {
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

      setClient(
        new ApolloClient({
          link: from([checkHeadersLink, errorLink, httpLink]),
          cache: new InMemoryCache(),
        })
      );
    }
  }, [uuid]);

  return ({ client });
};

export default useClientSetup;
