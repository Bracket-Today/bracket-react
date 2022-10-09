import React from 'react';
import { useMutation } from '@apollo/client';
import Modal from 'react-native-modal';

import { Title } from 'app/src/styles';
import { ModalContent } from 'app/src/styles/modal';
import { Button } from 'app/src/elements/buttons';

import CompetitorDetails from './CompetitorDetails';

const ContestDetails = ({ contest, refetch, handleHide }) => {
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
        <Button type="Cancel" label="Close" onPress={handleHide} wide />
      </ModalContent>
    </Modal>
  );
};

export default ContestDetails;
