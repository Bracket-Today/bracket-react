import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import { Warning, WarningText } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import ClientContext from 'app/src/contexts/ClientContext';
import Input from 'app/src/elements/inputs';
import { Button } from 'app/src/elements/buttons';

import { LOGIN } from './queries';

const Login = () => {
  const [submitting, setSubmitting] = useState();
  const { currentUser, updateCredentials } = useContext(ClientContext);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' }
  });

  const [login, { error }] = useMutation(LOGIN, {
    onCompleted: data => {
      updateCredentials(data.userLogin.credentials);
    },
    onError: () => {
      setSubmitting(false);
    }
  });

  const onSubmit = data => {
    login({ variables: data });
    setSubmitting(true);
  };

  return (
    <DataState loading={submitting}>
      {error && (
        <Warning>
          <WarningText>{error.message}</WarningText>
        </Warning>
      )}
      <Input.Text
        label="Email"
        name="email"
        rules={{ required: 'Required' }}
        control={control}
        errors={errors}
      />
      <Input.Text
        label="Password"
        name="password"
        secureTextEntry
        rules={{ required: 'Required' }}
        control={control}
        errors={errors}
      />

      <Button label="Login" onPress={handleSubmit(onSubmit)} wide />
    </DataState>
  );
};

export default Login;
