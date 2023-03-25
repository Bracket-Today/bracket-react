import React, { useContext, useState } from 'react';
import { Pressable } from 'react-native';
import { useMutation } from '@apollo/client';
import Toast from 'react-native-toast-message';

import { useNavigate } from 'app/src/utils/routing';
import ConfirmContext from 'app/src/contexts/ConfirmContext';

import { CLONE_TOURNAMENT } from './queries';

const CONFIRM_MESSAGE = 'Create a new tournament based on this on this one? ' +
  'You can edit the tournament after it is created.'

const Clone = ({ tournament, children }) => {
  const { showConfirm, hideConfirm } = useContext(ConfirmContext);
  const navigate = useNavigate();

  const [cloneTournament] = useMutation(CLONE_TOURNAMENT, {
    onCompleted: data => {
      hideConfirm();

      navigate(`/tournaments/${data.cloneTournament.tournament.id}`);

      Toast.show({
        type: 'success',
        text1: 'Awesome!',
        text2: 'You can make this tournament your own',
      });
    }
  });

  const showCloneConfirm = () => {
    showConfirm({
      title: 'Clone Tournament',
      message: CONFIRM_MESSAGE,
      onConfirm: () => {
        cloneTournament({ variables: { input: { id: tournament.id } } })
      }
    });
  };

  return (
    <Pressable onPress={showCloneConfirm}>
      {children}
    </Pressable>
  );
};

export default Clone;
