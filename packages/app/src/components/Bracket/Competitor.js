import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';

import { Text, Hint } from 'app/src/styles';

import ContestDetails from './ContestDetails';
import VoteButton from './VoteButton';

const Container = styled(View)`
  display: flex;
  flex-direction: row;
`;

const Score = styled(Text)`
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 3px;
  font-size: 12px;
`;

const Annotation = styled(Hint)`
  font-size: 12px;
`;

const Competitor = ({ competitor, contest, priorScore }) => {
  const [showContest, setShowContest] = useState();

  const style = {};
  if (contest.winner?.id === competitor?.id) {
    style['color'] = 'green'
  }

  const annotation = competitor?.annotation || competitor?.entity.annotation;

  return (
    <Container>
      <Pressable onPress={() => setShowContest(true)}>
        <Text style={style}>
          {competitor?.seed} {competitor?.entity.name}
        </Text>
        {annotation && <Annotation>{annotation}</Annotation>}
      </Pressable>
      {priorScore && <Score>({priorScore[0]}-{priorScore[1]})</Score>}
      <VoteButton competitor={competitor} contest={contest} />
      {showContest && (
        <ContestDetails
          contest={contest}
          handleHide={() => setShowContest(false)}
        />
      )}
    </Container>
  );
};

export default Competitor;
