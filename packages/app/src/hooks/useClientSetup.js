import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import config from 'app/src/config';
import storage from 'app/src/utils/storage';

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
      setClient(
        new ApolloClient({
          uri: config.api.uri,
          headers: { 'X-UUID': uuid },
          cache: new InMemoryCache(),
        })
      );
    }
  }, [uuid]);

  return ({ client });
};

export default useClientSetup;
