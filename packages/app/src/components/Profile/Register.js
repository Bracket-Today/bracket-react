import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { Text, Warning, WarningText } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import Input from 'app/src/elements/inputs';
import { Button } from 'app/src/elements/buttons';

import { REGISTER_USER } from './queries';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const [submitting, setSubmitting] = useState();

  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  });

  const password = useRef({});
  password.current = watch('password', '');

  const [registerUser, { error }] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      setSubmitting(
        'Check your email for instructions to complete your registration'
      );

      Toast.show({
        type: 'success',
        text1: 'Check your email',
        text2: 'for confirmation instructions',
        visibilityTime: 15000,
      });
    },
    onError: () => {
      setSubmitting(false);
    }
  });

  const onSubmit = data => {
    registerUser({ variables: { input: data } });
    setSubmitting(true);
  };

  if ('string' === typeof submitting) {
    return (
      <View>
        <Text>{submitting}</Text>
      </View>
    );
  }

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
        rules={{
          required: 'Reguired',
          pattern: { value: EMAIL, message: 'Must be a valid email' }
        }}
        control={control}
        errors={errors}
      />
      <Input.Text
        label="Password"
        name="password"
        secureTextEntry
        {...register('password')}
        rules={{
          required: 'Required',
          minLength: { value: 8, message: 'Must be at least 8 characters' },
        }}
        control={control}
        errors={errors}
      />
      <Input.Text
        label="Confirm Password"
        name="passwordConfirmation"
        secureTextEntry
        rules={{
          required: 'Required',
          minLength: { value: 8, message: 'Must be at least 8 characters' },
          validate: value => (
            value === password.current || 'Confirmation does not match password'
          )
        }}
        control={control}
        errors={errors}
      />

      <Button label="Register" onPress={handleSubmit(onSubmit)} wide />
    </DataState>
  );
};

export default Register;
