import React from 'react';
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

export const TextInput = props => {
  const { label, control, errors, placeholder, ...controlerProps } = props;

  return (
    <Field>
      <View style={{flexDirection: 'row'}}>
        <Text>{label}</Text>
        {errors?.[props.name] && <ErrorText>Required.</ErrorText>}
      </View>
      <Controller
        {...props}
        control={control}
        render={({ field }) => (
          <StyledTextInput
            {...field}
            placeholder={placeholder}
            onChangeText={field.onChange}
          />
        )}
      />
    </Field>
  );
};

const Input = {
  Text: TextInput,
};

export default Input;
