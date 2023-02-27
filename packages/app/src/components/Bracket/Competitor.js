import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';

import { Text, Hint } from 'app/src/styles';
import truncate from 'app/src/utils/truncate';
import ExternalLink from 'app/src/elements/ExternalLink';

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

  const link = competitor?.entity.externalLinks[0];

  return (
    <Container>
      <Pressable onPress={() => setShowContest(true)}>
        <Text style={style}>
          {competitor?.seed} {competitor?.entity.name}
        </Text>
        {annotation && <Annotation>{annotation}</Annotation>}
        {link && (
          <ExternalLink url={link.url}>
            <Annotation>{truncate(link.url, 60)} ↗</Annotation>
          </ExternalLink>
        )}
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
