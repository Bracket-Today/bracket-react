import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useMutation } from '@apollo/client';
import MediaQuery from 'react-native-web-responsive';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';

import { Picker } from 'app/src/elements/Picker';
import { Subtitle, Text, Hint } from 'app/src/styles';

import { UPDATE_TOURNAMENT_VISIBILITY } from './queries';

const VisibilityForm = styled(View)`
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 1px;
  align-items: baseline;
`;

const VisibilityFormSmall = styled(VisibilityForm)`
  flex-direction: column;
`;

const VisibilityPicker = styled(Picker)`
  margin-left: 10px;
  margin-right: 10px;
  width: 300px;
`;

const visibilityOptions = [
  {
    value: 'Can Feature',
    label: 'Public - Okay to Feature',
    description: 'You can schedule this bracket, but we may feature it ' +
      'first. If you may want to feature, but not ready yet, change to ' +
      '"Public - Don\'t Feature" for now.'
  },
  {
    value: 'Public',
    label: "Public - Don't Feature",
    description: "When you're ready, you can schedule this. It may show on " +
      "the home page and you'll also have a direct link you can share."
  },
  {
    value: 'Private',
    label: 'Private',
    description: "You can schedule and share a direct link, but We won't " +
      "show the bracket on the home page."
  },
];

const Visibility = ({ tournament, canSchedule, refetch }) => {
  const [updateTournamentVisibility] = useMutation(
    UPDATE_TOURNAMENT_VISIBILITY,
    {
      onCompleted: () => {
        refetch();
        Toast.show({
          type: 'success',
          text1: 'Visibility updated.',
          visibilityTime: 2000,
        });
      }
    }
  );

  const handleVisibilityChange = useCallback(value => {
    updateTournamentVisibility({
      variables: { input: { id: tournament.id, visibility: value } }
    });
  });

  if (!tournament) {
    return null;
  }

  const selectedVisibility = visibilityOptions.find(option => (
    option.value === tournament.visibility
  ));

  const VisibilityFormChildren = () => {
    return (
      <>
        <Text>Visibility:</Text>
        <VisibilityPicker
          selectedValue={selectedVisibility?.value}
          onValueChange={handleVisibilityChange}
        >
          {visibilityOptions.map(option => (
            <Picker.Item
              key={option.value}
              value={option.value}
              label={option.label}
            />
          ))}
        </VisibilityPicker>
        <Hint>{selectedVisibility?.description}</Hint>
      </>
    );
  };

  return (
    <>
      {canSchedule && (
        <>
          <Subtitle>This tournament is ready to be scheduled!</Subtitle>
          {'Can Feature' === selectedVisibility.value ? (
            <Text>
              We may feature it, or soon you'll be able to schedule it.
            </Text>
          ) : (
            <Text>
              Unfortunately, the functionality doesn't exist yet.
              We expect it before the end of August.
            </Text>
          )}
        </>
      )}

      <MediaQuery maxWidth={799}>
        <VisibilityFormSmall>
          <VisibilityFormChildren />
        </VisibilityFormSmall>
      </MediaQuery>

      <MediaQuery minWidth={800}>
        <VisibilityForm>
          <VisibilityFormChildren />
        </VisibilityForm>
      </MediaQuery>
    </>
  );
};

export default Visibility;
