import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';

import DataState from 'app/src/components/DataState';
import ClientContext from 'app/src/contexts/ClientContext';
import { Button } from 'app/src/elements/buttons';

import { LOGOUT } from './queries';

const Logout = () => {
  const { updateCredentials } = useContext(ClientContext);

  const [logout, { loading }] = useMutation(LOGOUT, {
    onCompleted: () => updateCredentials(null)
  });

  return (
    <DataState loading={loading}>
      <Button label="Logout" onPress={logout} wide />
    </DataState>
  );
};

export default Logout;
