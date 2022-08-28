import React, { forwardRef } from 'react';
import styled from 'styled-components/native';
import { Controller } from 'react-hook-form';

import { View, TextInput as BaseTextInput } from 'react-native';
import { Text } from 'app/src/styles';

const StyledTextInput = styled(BaseTextInput)`
  border-width: 1px;
  border-color: black;
  padding: 6px;
`;

const ErrorText = styled(Text)`
  padding-left: 10px;
  color: red;
`;

const Field = styled(View)`
  marginBottom: 10px;
`;

export const TextInput = forwardRef((props, ref) => {
  const {
    label,
    control,
    errors,
    placeholder,
    secureTextEntry,
    ...controllerProps
  } = props;

  let errorMessage;

  if (errors?.[props.name]) {
    errorMessage = errors[props.name].message || 'Required';
  }

  return (
    <Field>
      <View style={{flexDirection: 'row'}}>
        <Text>{label}</Text>
        {errorMessage && <ErrorText>{errorMessage}.</ErrorText>}
      </View>
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

const Input = {
  Text: TextInput,
};

export default Input;
