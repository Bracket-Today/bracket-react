import React from 'react';
import { View, Pressable } from 'react-native';
import { useMutation } from '@apollo/client';
import styled from 'styled-components/native';

import { Text } from 'app/src/styles';

import { REMOVE_COMPETITOR } from './queries';

const Container = styled(View)`
  flex-direction: row;
`;

const RemoveButton = styled(Pressable)`
  margin-left: 6px;
`;

const RemoveIcon = styled(Text)`
  color: red;
  font-weight: 900;
  font-size: 14px;
`;

const Competitor = ({ competitor, refetch, tournamentStatus }) => {
  const [removeCompetitor] = useMutation(REMOVE_COMPETITOR, {
    onCompleted: refetch
  });

  const handleRemove = competitor => {
    removeCompetitor({
      variables: { input: { id: competitor.id } }
    });
  };

  return (
    <Container>
      <Text>{competitor.entity.name}</Text>
      {!['Closed', 'Active'].includes(tournamentStatus) && (
        <RemoveButton onPress={() => handleRemove(competitor)}>
          <RemoveIcon>🅇</RemoveIcon>
        </RemoveButton>
      )}
    </Container>
  );
};

export default Competitor;
