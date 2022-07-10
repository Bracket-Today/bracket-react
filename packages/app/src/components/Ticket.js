import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';

import config from 'app/src/config';
import { Text } from 'app/src/styles';
import Input from 'app/src/elements/inputs';
import { Button } from 'app/src/elements/buttons';

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
      <Input.Text
        label="Your Name"
        name="name"
        rules={{required: true}}
        control={control}
        errors={errors}
      />
      <Input.Text
        label="Email"
        name="email"
        rules={{required: true}}
        control={control}
        errors={errors}
      />
      <Input.Text
        label="In just a few words, what isn't working correctly?"
        name="subject"
        rules={{required: true}}
        control={control}
        errors={errors}
      />
      <Input.Text
        label="Please describe in detail what went wrong"
        name="problem"
        control={control}
      />
      <Input.Text
        label="What were you expecting to happen?"
        name="expectation"
        control={control}
      />

      <Button label="Submit" onPress={handleSubmit(onSubmit)} wide />
    </View>
  );
};

export default Ticket;
