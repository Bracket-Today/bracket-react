import React from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/client';

import { Text } from 'app/src/styles';

import { SUBMIT_VOTE } from './queries';

const VoteIcon = styled(View)`
  background-color: gray;
  color: white;
  border-radius: ${({ large }) => large ? '20px' : '10px'};
  width: ${({ large }) => large ? '40px' : '20px'};
  height: ${({ large }) => large ? '40px' : '20px'};
  margin-left: 3px;
  padding-left: ${({ large }) => large ? '6px' : '3px'};
`;

const Checkmark = styled(Text)`
  color: white;
  font-size: ${({ large }) => large ? '32px' : '16px'};
`;

const VoteButton = ({ competitor, contest, refetch, large }) => {
  const [submitVote] = useMutation(SUBMIT_VOTE, {
    variables: {
      input: {
        competitorId: competitor?.id,
        contestId: contest?.id,
      }
    },
  });

  let voteIcon = null;
  let handleVote = null;

  const currentVote =
    competitor && competitor?.id === contest.currentUserVote?.id;

  if (currentVote) {
    voteIcon = (
      <VoteIcon large={large} style={{backgroundColor: 'green'}}>
        <Checkmark large={large}>✓</Checkmark>
      </VoteIcon>
    );
  } else if (contest.isActive) {
    voteIcon = (
      <VoteIcon large={large}>
        <Checkmark large={large}>✓</Checkmark>
      </VoteIcon>
    );

    handleVote = submitVote;
  }

  return (
    <Pressable onPress={handleVote}>
      <Text>
        {voteIcon}
      </Text>
    </Pressable>
  );
};

export default VoteButton;
