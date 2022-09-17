import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import DataState from 'app/src/components/DataState';
import ClientContext from 'app/src/contexts/ClientContext';
import Input from 'app/src/elements/inputs';
import { Button } from 'app/src/elements/buttons';

import { UPDATE_CURRENT_USER } from './queries';

const EditProfile = () => {
  const [submitting, setSubmitting] = useState();
  const [userErrors, setUserErrors] = useState();
  const { currentUser, refetchCurrentUser } = useContext(ClientContext);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { username: currentUser.username || '' }
  });

  useEffect(() => {
    const { username } = currentUser;
    reset({ username: (username || '') });
  }, [currentUser]);

  const [updateCurrentUser, { error }] = useMutation(UPDATE_CURRENT_USER, {
    onCompleted: data => {
      setSubmitting(false);
      setUserErrors(data.updateCurrentUser.errors);
      refetchCurrentUser();
    },
    onError: () => {
      setSubmitting(false);
    }
  });

  const onSubmit = input => {
    updateCurrentUser({ variables: { input } });
    setSubmitting(true);
  };

  return (
    <DataState loading={submitting} userErrors={userErrors}>
      <Input.Text
        label="Username"
        name="username"
        control={control}
        errors={errors}
        rules={{
          pattern: {
            value: /^\w{4,15}$/,
            message: 'Must be 4 to 15 letters, numbers, or underscore'
          }
        }}
      />

      <Button label="Save" onPress={handleSubmit(onSubmit)} wide />
    </DataState>
  );
};

export default EditProfile;
