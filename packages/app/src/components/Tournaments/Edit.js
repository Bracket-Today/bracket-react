import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import styled from 'styled-components/native';

import DataState from 'app/src/components/DataState';
import { ModalContent } from 'app/src/styles/modal';
import Input from 'app/src/elements/inputs';
import { Button } from 'app/src/elements/buttons';

import { UPDATE_TOURNAMENT } from './queries';

const EditTournament = ({ tournament, handleHide }) => {
  const [submitting, setSubmitting] = useState();

  const [updateTournament] = useMutation(UPDATE_TOURNAMENT, {
    onCompleted: handleHide
  });

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      id: tournament.id,
      name: tournament.name,
      notes: tournament.notes,
    }
  });

  const onSubmit = useCallback(input => {
    setSubmitting(true);
    updateTournament({ variables: { input } });
  });

  return (
    <Modal isVisible avoidKeyboard onBackdropPress={handleHide}>
      <ModalContent>
        <DataState loading={submitting}>
          <Input.Text
            label="Name"
            name="name"
            control={control}
            errors={errors}
          />
          <Input.Text
            label="Notes"
            name="notes"
            control={control}
            errors={errors}
          />
          <Button label="Update" onPress={handleSubmit(onSubmit)} wide />
          <Button type="Cancel" onPress={handleHide} wide />
        </DataState>
      </ModalContent>
    </Modal>
  );
};

export default EditTournament;
