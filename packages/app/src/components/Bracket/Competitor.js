import React from 'react';
import { Text, View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/client';

import { SUBMIT_VOTE } from './queries';

const Container = styled(View)`
  display: flex;
  flex-direction: row;
`;

const VoteIcon = styled(View)`
  background-color: gray;
  color: white;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  margin-left: 3px;
  padding-left: 3px;
`;

const Competitor = ({ competitor, contest, refetch }) => {
  const [submitVote] = useMutation(SUBMIT_VOTE, {
    variables: {
      input: {
        competitorId: competitor?.id,
        contestId: contest?.id,
      }
    },
    onCompleted: refetch
  });

  const style = {};
  if (contest.winner?.id === competitor?.id) {
    style['color'] = 'green'
  }

  let voteIcon = null;
  let handleVote = null;

  const currentVote =
    competitor && competitor?.id === contest.currentUserVote?.id;

  if (currentVote) {
    voteIcon = (
      <VoteIcon style={{backgroundColor: 'green'}}>
        <Text style={{color: 'white'}}>✓</Text>
      </VoteIcon>
    );
  } else if (contest.isActive) {
    voteIcon = (
      <VoteIcon>
        <Text style={{color: 'white'}}>✓</Text>
      </VoteIcon>
    );

    handleVote = submitVote;
  }

  return (
    <Container>
      <Text style={style}>
        {competitor?.seed} {competitor?.entity.name}
      </Text>
      <Pressable onPress={handleVote}>
        <Text>
          {voteIcon}
        </Text>
      </Pressable>
    </Container>
  );
};

export default Competitor;
