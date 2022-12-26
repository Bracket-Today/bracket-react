import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';

import { useParams, useNavigate } from 'app/src/utils/routing';
import { Header, Title, Text, Hint } from 'app/src/styles';
import DataState from 'app/src/components/DataState';

import Comments from '../Comments';

import { TOURNAMENT } from './queries';
import BracketSubtitle from './Subtitle';
import Contest from './Contest';

const Tournament = styled(View)`
  display: flex;
  flex-direction: row;
`;

const Round = styled(View)`
  display: flex;
  flex-direction: column;
  min-width: 100px;
`;

const NotesContainer = styled(View)`
  margin-bottom: 10px;
`;

const Notes = styled(Hint)`
`;

const Bracket = () => {
  const { id } = useParams();
  const [updatedAt, setUpdatedAt] = useState();

  const navigate = useNavigate();

  const { data, refetch, ...queryStatus } =
    useQuery(TOURNAMENT, { variables: { id }, fetchPolicy: 'network-only' });

  const goToTournament = tournament => {
    navigate(tournament.bracketPath);
    Toast.hide();
  }

  const goToCreate = () => {
    navigate('/tournaments');
    Toast.hide();
  }

  useEffect(() => {
    if ('Active' === data?.tournament?.status) {
      setUpdatedAt(Date.now());

      if (!data.tournament.currentUserShouldVote) {
        const nextTournament = data.tournament.currentUserNextTournament;
        if (nextTournament) {
          Toast.show({
            type: 'success',
            text1: 'Your votes are recorded!',
            text2: `Click to vote on ${nextTournament.name}`,
            visibilityTime: 10000,
            onPress: () => goToTournament(nextTournament),
          });
        } else {
          Toast.show({
            type: 'success',
            text1: 'Create a bracket',
            text2: "There's nothing more to vote on.",
            visibilityTime: 5000,
            onPress: () => goToCreate(),
          });
        }
      }
    }
  }, [data]);

  if (data && !data.tournament) {
    Toast.show({
      type: 'error',
      text1: "Sorry, we couldn't find this bracket",
      text2: 'But there are many others',
      visibilityTime: 5000,
    });

    navigate('/');

    return (<></>);
  }

  return (
    <DataState data={data} {...queryStatus}>
      <Helmet>
        <title>{data?.tournament.name}</title>
      </Helmet>
      <Header>
        <Title>{data?.tournament.name}</Title>
        {data?.tournament.notes && (
          <NotesContainer>
            <Notes>{data?.tournament.notes}</Notes>
          </NotesContainer>
        )}
        {data?.tournament && (
          <BracketSubtitle
            tournament={data?.tournament}
            updatedAt={updatedAt}
          />
        )}
      </Header>
      <ScrollView horizontal>
        <Tournament>
          {data?.tournament.rounds.map(round => (
            <Round key={round.number}>
              <Text>Round #{round.number}</Text>
              {round.contests.map(contest => (
                <View key={contest.id} style={{flex: round.multiplier}}>
                  <Contest contest={contest} refetch={refetch} />
                </View>
              ))}
            </Round>
          ))}
        </Tournament>
      </ScrollView>
      {data?.tournament.viewComments && (
        <Comments tournament={data.tournament} refetch={refetch} />
      )}
    </DataState>
  );
};

export default Bracket;
