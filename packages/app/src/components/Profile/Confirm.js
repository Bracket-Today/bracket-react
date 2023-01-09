import React, { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Toast from 'react-native-toast-message';

import { Warning, WarningText } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import ClientContext from 'app/src/contexts/ClientContext';
import { useNavigate, useSearchParams } from 'app/src/utils/routing';

import { CONFIRM_REGISTRATION } from './queries';

const Confirm = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('confirmationToken');
  const { updateCredentials } = useContext(ClientContext);

  const [confirmRegistration, { error }] = useMutation(CONFIRM_REGISTRATION, {
    onCompleted: data => {
      updateCredentials(data.userConfirmRegistrationWithToken.credentials);

      Toast.show({
        type: 'success',
        text1: 'Registration Confirmed',
        visibilityTime: 5000,
      });

      navigate('/me');
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: "We couldn't find this confirmation token",
        visibilityTime: 10000,
      });

      navigate('/me');
    }
  });

  useEffect(() => {
    if (!token || !token.length) {
      navigate('/me');

      Toast.show({
        type: 'error',
        text1: "We couldn't find this confirmation token",
        visibilityTime: 10000,
      });
    } else {
      confirmRegistration({ variables: { confirmationToken: token } });
    }
  }, []);

  if (error) {
    return (
      <Warning>
        <WarningText>{error.message}</WarningText>
      </Warning>
    );
  }

  return (
    <DataState loading />
  );
};

export default Confirm;
