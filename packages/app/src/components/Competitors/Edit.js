import React, { useCallback, useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import DataState from 'app/src/components/DataState';
import { Text } from 'app/src/styles';
import { ModalContent } from 'app/src/styles/modal';
import Input from 'app/src/elements/inputs';
import { Button } from 'app/src/elements/buttons';

import { UPDATE_COMPETITOR } from './queries';

const EditCompetitor = ({ competitor, handleHide }) => {
  const [submitting, setSubmitting] = useState();

  const [updateCompetitor] = useMutation(UPDATE_COMPETITOR, {
    onCompleted: handleHide
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { id: competitor.id, name: competitor.entity.name || '' }
  });

  const onSubmit = useCallback(input => {
    setSubmitting(true);
    updateCompetitor({ variables: { input } });
  });

  return (
    <Modal visible transparent>
      <ModalContent>
        <DataState loading={submitting}>
          <Input.Text
            label="Competitor Name"
            name="name"
            control={control}
            errors={errors}
            rules={{required: true}}
          />
          <Button label="Save" onPress={handleSubmit(onSubmit)} wide />
          <Button
            type="Cancel"
            onPress={handleHide}
            wide
          />
        </DataState>
      </ModalContent>
    </Modal>
  );
};

export default EditCompetitor;
