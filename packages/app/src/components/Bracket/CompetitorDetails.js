import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Subtitle, Text, Hint } from 'app/src/styles';
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

const Annotation = styled(Hint)`
`;

const CompetitorDetails = ({ competitor, contest }) => {
  return (
    <Container>
      {competitor ? (
        <Header>
          <View>
            <Subtitle style={{color: colors.screen}}>
              {competitor.entity.name}
            </Subtitle>
            <Text>Seed {competitor.seed}</Text>
            {competitor.annotation && (
              <Annotation>{competitor.annotation}</Annotation>
            )}
            {competitor.entity.annotation && (
              <Annotation>{competitor.entity.annotation}</Annotation>
            )}
          </View>
          <View style={{width: 50}}>
            <VoteButton
              large
              competitor={competitor}
              contest={contest}
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
