import React, { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import { Text, WarningText } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import ClientContext from 'app/src/contexts/ClientContext';
import Input from 'app/src/elements/inputs';
import { Button, ButtonGroup } from 'app/src/elements/buttons';
import { Link } from 'app/src/utils/routing';

import { CREATE_COMMENT } from './queries';

const NewComment = ({ tournament, parent, handleHide }) => {
  const [submitting, setSubmitting] = useState();
  const { currentUser } = useContext(ClientContext);

  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: handleHide
  });

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      tournamentId: tournament.id,
      body: '',
      parentId: parent?.id,
    }
  });

  const onSubmit = useCallback(input => {
    setSubmitting(true);
    createComment({ variables: { input } });
  });

  if (!currentUser?.registered || !currentUser.username) {
    return (
      <Link to="/me">
        <WarningText>
          You must register your email and choose a username to comment
        </WarningText>
      </Link>
    )
  }

  return (
    <DataState loading={submitting}>
      <Input.Text
        label="Comment"
        name="body"
        control={control}
        errors={errors}
      />
      <ButtonGroup>
        <Button label="Post" onPress={handleSubmit(onSubmit)} />
        <Button type="Cancel" onPress={handleHide} />
      </ButtonGroup>
    </DataState>
  );
};

export default NewComment;
