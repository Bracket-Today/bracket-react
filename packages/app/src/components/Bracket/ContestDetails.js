import React from 'react';
import { useMutation } from '@apollo/client';
import Modal from 'react-native-modal';

import { Title } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import { ModalContent } from 'app/src/styles/modal';
import { Button } from 'app/src/elements/buttons';

import CompetitorDetails from './CompetitorDetails';
import { CLEAR_VOTE } from './queries';

const ContestDetails = ({ contest, refetch, handleHide }) => {
  const [clearVote] = useMutation(CLEAR_VOTE, {
    variables: { input: { contestId: contest?.id } },
    onCompleted: refetch
  });

  return (
    <Modal isVisible avoidKeyboard onBackdropPress={handleHide}>
      <ModalContent>
        <Title>Round #{contest.round}</Title>
        <CompetitorDetails
          competitor={contest.upper}
          contest={contest}
          refetch={refetch}
        />
        <CompetitorDetails
          competitor={contest.lower}
          contest={contest}
          refetch={refetch}
        />
        {contest.isActive && contest.currentUserVote && (
          <Button
            label="Clear My Vote"
            onPress={clearVote}
            style={{backgroundColor: colors.screen, marginBottom: 0}}
            wide
          />
        )}
        <Button type="Cancel" label="Close" onPress={handleHide} wide />
      </ModalContent>
    </Modal>
  );
};

export default ContestDetails;
