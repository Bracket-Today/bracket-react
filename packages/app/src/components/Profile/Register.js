import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';

import { Subtitle, Text } from 'app/src/styles';
import Input from 'app/src/elements/inputs';
import { Button } from 'app/src/elements/buttons';

import { REGISTER_USER } from './queries';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Container = styled(View)`
  margin-top: 10px;
  padding-top: 10px;
  border-top-style: solid;
  border-top-color: black;
  border-top-width: 1px;
`;

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

  const [registerUser] = useMutation(REGISTER_USER, {
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
    }
  });

  const onSubmit = data => {
    registerUser({ variables: { input: data } });
    setSubmitting('Submitting...');
  };

  if (submitting) {
    return (
      <View>
        <Text>{submitting}</Text>
      </View>
    );
  }

  return (
    <Container>
      <Subtitle>Register</Subtitle>
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

      <Button label="Submit" onPress={handleSubmit(onSubmit)} wide />
    </Container>
  );
};

export default Register;
