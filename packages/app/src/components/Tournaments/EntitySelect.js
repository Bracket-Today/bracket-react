import React, { useState } from 'react';
import { Pressable, View, TextInput as BaseTextInput } from 'react-native';
import { useLazyQuery, useMutation } from '@apollo/client';
import styled from 'styled-components/native';

import { Text } from 'app/src/styles';
import colors from 'app/src/styles/colors';

import { ENTITIES, CREATE_COMPETITOR } from './queries';

const Container = styled(View)`
  min-height: 400px;
`;

const InputContainer = styled(View)`
  flex-direction: row;
`;

const StyledTextInput = styled(BaseTextInput)`
  border-width: 1px;
  border-color: black;
  flex: 1;
  padding: 6px;
`;

const Checkbox = styled(Pressable)`
  width: 60px;
  background-color: ${colors.disabled};
  justify-content: center;
  padding-left: 16px;
  max-height: 42px;
`;

const Check = styled(Text)`
  font-size: 24px;
  font-weight: 900;
  color: white;
`;

const Results = styled(View)`
  background-color: #f0f0f0;
  padding-left: 7px
`;

const Suggestion = ({ entity, tournament, createCompetitor }) => {
  const handlePress = () => {
    createCompetitor({
      variables: {
        input: {
          tournamentId: tournament.id,
          entityId: entity.id,
        }
      }
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Text>{entity.name}</Text>
    </Pressable>
  );
};

const EntitySelect = ({ tournament, refetch }) => {
  const [term, setTerm] = useState('');

  const [loadEntities, { data }] = useLazyQuery(ENTITIES);

  const [createCompetitor] = useMutation(CREATE_COMPETITOR, {
    onCompleted: () => {
      refetch();
      setTerm('');
    }
  });

  const handlePress = () => {
    if (!term.length) { return; }

    createCompetitor({
      variables: {
        input: {
          tournamentId: tournament.id,
          name: term,
        }
      }
    });
  };

  const handleKeyPress = e => {
    if (e.nativeEvent.key === 'Enter') {
      e.preventDefault(); // Don't lose focus
      handlePress();
    }
  };

  const changeTerm = value => {
    setTerm(value);

    if (value && value.length) {
      loadEntities({ variables: { term: value } });
    }
  };

  const checkboxStyle = {
    backgroundColor: term.length ? colors.button : colors.disabled
  };


  return (
    <Container>
      <InputContainer>
        <StyledTextInput
          value={term}
          onChangeText={changeTerm}
          onKeyPress={handleKeyPress}
        />
        <Checkbox onPress={handlePress} style={checkboxStyle}>
          <Check>✓</Check>
        </Checkbox>
      </InputContainer>
      <Results>
        {term.length > 0 && data?.entities.map(entity => (
          <Suggestion
            key={entity.id}
            entity={entity}
            tournament={tournament}
            createCompetitor={createCompetitor}
          />
        ))}
      </Results>
    </Container>
  )
};

export default EntitySelect;
