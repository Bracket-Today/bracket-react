import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import DataState from 'app/src/components/DataState';
import ClientContext from 'app/src/contexts/ClientContext';
import Input from 'app/src/elements/inputs';
import { Button } from 'app/src/elements/buttons';
import { Subtitle } from 'app/src/styles';

import { UPDATE_CURRENT_USER } from './queries';

const EditProfile = () => {
  const [submitting, setSubmitting] = useState();
  const [userErrors, setUserErrors] = useState();
  const { currentUser, refetchCurrentUser } = useContext(ClientContext);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: currentUser.username || '',
      instagramHandle: currentUser.instagramHandle || '',
      twitterHandle: currentUser.twitterHandle || '',
    }
  });

  useEffect(() => {
    reset({
      username: currentUser.username || '',
      instagramHandle: currentUser.instagramHandle || '',
      twitterHandle: currentUser.twitterHandle || '',
    });
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

      <Subtitle>
        If you want to provide your social media handles, we can tag you when
        your brackets are featured or with other updates.
      </Subtitle>

      <Input.Text
        label="Instagram Handle"
        name="instagramHandle"
        control={control}
        errors={errors}
      />

      <Input.Text
        label="Twitter Handle"
        name="twitterHandle"
        control={control}
        errors={errors}
      />

      <Button label="Save" onPress={handleSubmit(onSubmit)} wide />
    </DataState>
  );
};

export default EditProfile;
