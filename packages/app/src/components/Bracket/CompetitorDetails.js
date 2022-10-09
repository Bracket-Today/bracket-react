import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Subtitle, Text } from 'app/src/styles';
import colors from 'app/src/styles/colors';

import VoteButton from './VoteButton';

const Container = styled(View)`
  border-top-width: 2px;
  border-top-color: black;
  padding-top: 6px;
  padding-bottom: 6px;
`;

const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const CompetitorDetails = ({ competitor, contest, refetch }) => {
  return (
    <Container>
      {competitor ? (
        <Header>
          <View>
            <Subtitle style={{color: colors.screen}}>{competitor.entity.name}</Subtitle>
            <Text>Seed {competitor.seed}</Text>
          </View>
          <View style={{width: 50}}>
            <VoteButton
              large
              competitor={competitor}
              contest={contest}
              refetch={refetch}
            />
          </View>
        </Header>
      ) : (
        <Subtitle>Bye</Subtitle>
      )}
    </Container>
  );
};

export default CompetitorDetails;
