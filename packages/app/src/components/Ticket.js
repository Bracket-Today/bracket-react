import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';

import config from 'app/src/config';
import { Text } from 'app/src/styles';
import Input from 'app/src/elements/inputs';
import { Button } from 'app/src/elements/buttons';

const typeOptions = [
  {
    value: 'bug',
    label: 'Bug Report',
  },
  {
    value: 'feature',
    label: 'Feature Request',
  },
  {
    value: 'comment',
    label: 'General Comment',
  },
];

const Ticket = () => {
  const [submitting, setSubmitting] = useState();

  const { control, handleSubmit, getValues, watch, formState: { errors } } = useForm({
    defaultValues: {
      type: 'bug',
      name: '',
      email: '',
      subject: '',
      problem: '',
      expectation: '',
    }
  });

  const onSubmit = data => {
    const { type, ...values } = data;
    if ('bug' !== type) {
      values.subject = typeOptions.find(({ value }) => value === type).label +
        ': ' + values.subject;
    }

    fetch('https://preflighttech.com/api/1/trouble_tickets', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.pti.token,
      },
      body: JSON.stringify(values)
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

  const labels = {
    subject: "In just a few words, what isn't working correctly?",
    expectation: 'What were you expecting to happen?',
  };

  watch('type');
  const type = getValues('type');

  if (type === 'feature') {
    labels.subject = 'In just a few words, what would you like to see added?';
    labels.expectation = "Are there any details of what you'd expect to see?";
  } else if (type === 'comment') {
    labels.subject = 'Subject';
    labels.expectation = 'Your comments';
  }

  return (
    <View>
      <Input.Picker
        label="Is this a..."
        name="type"
        options={typeOptions}
        control={control}
        errors={errors}
      />
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
        label={labels.subject}
        name="subject"
        rules={{required: true}}
        control={control}
        errors={errors}
      />
      {'bug' === type && (
        <Input.Text
          label="Please describe in detail what went wrong"
          name="problem"
          control={control}
        />
      )}
      <Input.Text
        label={labels.expectation}
        name="expectation"
        control={control}
      />

      <Button label="Submit" onPress={handleSubmit(onSubmit)} wide />
    </View>
  );
};

export default Ticket;
