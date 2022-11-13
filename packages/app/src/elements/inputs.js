import React, { forwardRef } from 'react';
import styled from 'styled-components/native';
import { Controller } from 'react-hook-form';
import {
  Platform,
  View,
  Switch,
  TextInput as BaseTextInput
} from 'react-native';

import { Text, Hint } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import fonts from 'app/src/styles/fonts';

import { Picker } from './Picker';
import { DateTimePicker } from './DateTimePicker';

export const StyledTextInput = styled(BaseTextInput)`
  border-width: 1px;
  border-color: black;
  padding: 6px;
`;

export const StyledPicker = styled(Picker)`
  border-color: black;
  padding: 3px;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 14px;
`;

const ErrorText = styled(Text)`
  padding-left: 10px;
  color: red;
`;

export const Field = styled(View)`
  margin-bottom: 10px;
`;

export const SwitchField = styled(View)`
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 10px;
  align-items: center;
`;

const SwitchLabel = styled(Text)`
  margin-left: 10px;
`;

export const FieldLabel = ({ name, label, hint, errors }) => {
  let errorMessage;

  if (errors?.[name]) {
    errorMessage = errors[name].message || 'Required';
  }

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Text>{label}</Text>
        {errorMessage && <ErrorText>{errorMessage}.</ErrorText>}
      </View>
      {hint && <Hint>{hint}</Hint>}
    </>
  );
};

export const TextInput = forwardRef((props, ref) => {
  const {
    label,
    hint,
    control,
    errors,
    placeholder,
    secureTextEntry,
    ...controllerProps
  } = props;

  return (
    <Field>
      <FieldLabel name={props.name} label={label} hint={hint} errors={errors} />
      <Controller
        {...controllerProps}
        control={control}
        render={({ field }) => (
          <StyledTextInput
            {...field}
            ref={ref}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            onChangeText={field.onChange}
          />
        )}
      />
    </Field>
  );
});

export const DateTimeInput = forwardRef((props, ref) => {
  const {
    label,
    hint,
    control,
    errors,
    options,
    ...controllerProps
  } = props;

  return (
    <Field>
      <FieldLabel name={props.name} label={label} hint={hint} errors={errors} />
      <Controller
        {...controllerProps}
        control={control}
        render={({ field }) => {
          const onChange = (e, valueOnNative) => {
            if ('web' === Platform.OS) {
              field.onChange(e.target.value);
            } else {
              field.onChange(valueOnNative);
            }
          };

          return (
            <DateTimePicker
              {...field}
              type="datetime-local"
              mode="datetime"
              onChange={onChange}
              ref={ref}
            />
          );
        }}
      />
    </Field>
  );
});

export const PickerInput = props => {
  const {
    label,
    hint,
    control,
    errors,
    options,
    ...controllerProps
  } = props;

  return (
    <Field>
      <FieldLabel name={props.name} label={label} hint={hint} errors={errors} />
      <Controller
        {...controllerProps}
        control={control}
        render={({ field }) => (
          <StyledPicker
            {...field}
            selectedValue={field.value}
            onValueChange={field.onChange}
          >
            {options.map(option => (
              <Picker.Item
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </StyledPicker>
        )}
      />
    </Field>
  );
};

export const SwitchInput = props => {
  const {
    label,
    control,
    ...controllerProps
  } = props;

  return (
    <SwitchField>
      <Controller
        {...controllerProps}
        control={control}
        render={({ field }) => (
          <Switch
            {...field}
            activeTrackColor={colors.lightButton}
            activeThumbColor={colors.button}
            onValueChange={field.onChange}
          />
        )}
      />
      <SwitchLabel>{label}</SwitchLabel>
    </SwitchField>
  );
};

const Input = {
  Text: TextInput,
  DateTime: DateTimeInput,
  Picker: PickerInput,
  Switch: SwitchInput,
};

export default Input;
