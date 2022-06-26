import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components/native';

import config from 'app/src/config';
import { Text } from 'app/src/styles';

const StyledTextInput = styled(TextInput)`
  border-width: 1px;
  border-color: black;
  padding: 6px;
`;

const ErrorText = styled(Text)`
  padding-left: 10px;
  color: red;
`;

const Field = styled(View)`
  marginBottom: 10px;
`;

const Input = ({ label, control, errors, ...props }) => {
  return (
    <Field>
      <View style={{flexDirection: 'row'}}>
        <Text>{label}</Text>
        {errors?.[props.name] && <ErrorText>Required.</ErrorText>}
      </View>
      <Controller
        {...props}
        control={control}
        render={({ field }) => (
          <StyledTextInput {...field} onChangeText={field.onChange} />
        )}
      />
    </Field>
  );
};

const Ticket = () => {
  const [submitting, setSubmitting] = useState();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      problem: '',
      expectaion: '',
    }
  });

  const onSubmit = data => {
    fetch('https://preflighttech.com/api/1/trouble_tickets', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.pti.token,
      },
      body: JSON.stringify(data)
    }).then(() => setSubmitting('Thank you.'));

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
    <View>
      <Input
        label="Your Name"
        name="name"
        rules={{required: true}}
        control={control}
        errors={errors}
      />
      <Input
        label="Email"
        name="email"
        rules={{required: true}}
        control={control}
        errors={errors}
      />
      <Input
        label="In just a few words, what isn't working correctly?"
        name="subject"
        rules={{required: true}}
        control={control}
        errors={errors}
      />
      <Input
        label="Please describe in detail what went wrong"
        name="problem"
        control={control}
      />
      <Input
        label="What were you expecting to happen?"
        name="expectation"
        control={control}
      />

      <Button title="Submit" color="black" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Ticket;
