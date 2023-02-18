import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Text } from 'app/src/styles';

import Competitor from './Competitor';

const Container = styled(View)`
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: auto;
  margin-bottom: auto;
`;

const Upper = styled(View)`
  border-bottom-width: 2px;
  border-bottom-color: black;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const Lower = styled(Upper)`
  border-right-width: 1px;
  border-right-color: black;
`;

const NoLower = styled(Lower)`
  min-height: 30px;
  border-right-style: none;
  border-bottom-style: none;
`;

const Contest = ({ contest }) => {
  return (
    <Container>
      <Upper>
        <Competitor
          competitor={contest.upper}
          contest={contest}
          priorScore={contest.upperPriorScore}
        />
      </Upper>
      {(contest.round > 1 || contest.lower) ? (
        <Lower>
          <Competitor
            competitor={contest.lower}
            contest={contest}
            priorScore={contest.lowerPriorScore}
          />
        </Lower>
      ) : (
        <NoLower />
      )}
    </Container>
  );
};

export default Contest;
