import React, { useCallback, useState } from 'react';
import { Platform, View } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { DateTime } from 'luxon';
import styled from 'styled-components/native';

import DataState from 'app/src/components/DataState';
import { ModalContent } from 'app/src/styles/modal';
import Input, {
  Field,
  FieldLabel,
  StyledPicker,
  StyledTextInput
} from 'app/src/elements/inputs';
import { Picker } from 'app/src/elements/Picker';
import { Button } from 'app/src/elements/buttons';

import { VISIBILITY_OPTIONS } from 'app/src/components/Tournaments/Visibility';

import { SCHEDULE_TOURNAMENT } from './queries';

const DURATION_UNIT_OPTIONS = [
  { value: 'HOUR', label: 'Hour(s)', max: 72 },
  { value: 'DAY', label: 'Day(s)', max: 7 },
];

const DurationContainer = styled(View)`
  flex-direction: ${'web' === Platform.OS ? 'row' : 'column'};
  justify-content: space-between;
`;

const ScheduleTournament = ({ tournament, handleHide }) => {
  const [submitting, setSubmitting] = useState();

  const [scheduleTournament] = useMutation(SCHEDULE_TOURNAMENT, {
    onCompleted: handleHide
  });

  const startAt = tournament.startAt ?
    DateTime.fromISO(tournament.startAt) :
    DateTime.now().plus({ hours: 1 }).startOf('hour');

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      id: tournament.id,
      startAt: (
        'web' === Platform.OS ?
          startAt.toISO({ includeOffset: false }) :
          startAt.toJSDate()
      ),
      roundDurationQuantity: tournament.roundDurationQuantity.toFixed(),
      roundDurationUnit: tournament.roundDurationUnit,
      visibility: tournament.visibility,
    }
  });

  const watchDurationUnit = watch('roundDurationUnit');

  const onSubmit = useCallback(input => {
    setSubmitting(true);

    if ('string' === typeof input.startAt) {
      input.startAt = DateTime.fromISO(input.startAt).toISO();
    } else {
      input.startAt = DateTime.fromJSDate(input.startAt).toISO();
    }

    input.roundDurationQuantity = parseInt(input.roundDurationQuantity);

    scheduleTournament({ variables: { input } });
  });

  const selectedVisibility = VISIBILITY_OPTIONS.find(option => (
    option.value === tournament.visibility
  ));

  return (
    <Modal isVisible avoidKeyboard onBackdropPress={handleHide}>
      <ModalContent>
        <DataState loading={submitting}>
          <Input.DateTime
            label="Start Time"
            name="startAt"
            control={control}
            errors={errors}
            rules={{
              required: 'Required',
              validate: value => {
                const datetime = ('string' === typeof value) ?
                  DateTime.fromISO(value) : value;

                return (datetime >= DateTime.now() || 'Must be in the future');
              }
            }}
          />
          <Field>
            <FieldLabel
              name="roundDurationQuantity"
              label="Round Duration"
              errors={errors}
            />
            <DurationContainer>
              <Controller
                name="roundDurationQuantity"
                control={control}
                rules={{
                  required: 'Required',
                  validate: value => {
                    const quantity = parseInt(value);
                    const max = DURATION_UNIT_OPTIONS
                      .find(({ value }) => value === watchDurationUnit)
                      .max;

                    if (quantity < 1) {
                      return 'Must be more than 0';
                    } else if (quantity > max) {
                      return `Must be less than ${max}`;
                    }

                    return true;
                  }
                }}
                render={({ field }) => (
                  <StyledTextInput
                    {...field}
                    onChangeText={field.onChange}
                  />
                )}
              />
              <Controller
                name="roundDurationUnit"
                control={control}
                render={({ field }) => (
                  <StyledPicker
                    {...field}
                    selectedValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {DURATION_UNIT_OPTIONS.map(option => (
                      <Picker.Item
                        key={option.value}
                        value={option.value}
                        label={option.label}
                      />
                    ))}
                  </StyledPicker>
                )}
              />
            </DurationContainer>
          </Field>
          <Input.Picker
            label="Visibility"
            name="visibility"
            options={VISIBILITY_OPTIONS}
            control={control}
            errors={errors}
          />
          <Button label="Schedule" onPress={handleSubmit(onSubmit)} wide />
          <Button type="Cancel" onPress={handleHide} wide />
        </DataState>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleTournament;
