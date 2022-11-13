import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import DataState from 'app/src/components/DataState';
import { Subtitle } from 'app/src/styles';
import { ModalContent } from 'app/src/styles/modal';
import Input from 'app/src/elements/inputs';
import { Button } from 'app/src/elements/buttons';

import { RANDOM_TOURNAMENT_SEEDS } from './queries';

const STRENGTH_OPTIONS = [
  { value: 'full', label: 'Fully Random' },
  { value: 'mild', label: 'Mild (only move seeds a little)' },
];

const RandomizeSeeds = ({ tournament, refetch, handleHide }) => {
  const [submitting, setSubmitting] = useState();

  const [randomTournamentSeeds] = useMutation(RANDOM_TOURNAMENT_SEEDS, {
    onCompleted: () => {
      refetch();
      handleHide();
    }
  });

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      id: tournament.id,
      strength: 'full'
    }
  });

  const onSubmit = useCallback(input => {
    setSubmitting(true);
    randomTournamentSeeds({ variables: { input } });
  });

  return (
    <Modal isVisible avoidKeyboard onBackdropPress={handleHide}>
      <ModalContent>
        <Subtitle>
          Are you sure you want to randomize the seeding order?
        </Subtitle>
        <DataState loading={submitting}>
          <Input.Picker
            label="Strength"
            name="strength"
            options={STRENGTH_OPTIONS}
            control={control}
            errors={errors}
          />
          <Button label="Randomize" onPress={handleSubmit(onSubmit)} wide />
          <Button type="Cancel" onPress={handleHide} wide />
        </DataState>
      </ModalContent>
    </Modal>
  );
};

export default RandomizeSeeds;
