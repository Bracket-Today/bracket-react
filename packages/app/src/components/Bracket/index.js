import React from 'react';
import { ScrollView, View } from 'react-native';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { useParams } from 'app/src/utils/routing';
import { HeaderText, Text } from 'app/src/styles';

import { TOURNAMENT } from './queries';
import Contest from './Contest';

const Header = styled(View)`
  margin-bottom: 20px;
`;

const Title = styled(HeaderText)`
  font-size: 22px;
  font-weight: 800;
`;

const Tournament = styled(View)`
  display: flex;
  flex-direction: row;
`;

const Round = styled(View)`
  display: flex;
  flex-direction: column;
  min-width: 100px;
`;

const Bracket = () => {
  const { id } = useParams();

  const { data, loading, refetch } =
    useQuery(TOURNAMENT, { variables: { id } });

  if (loading) { return <Text>Loading...</Text>; }

  return (
    <>
      <Header>
        <Title>{data.tournament.name}</Title>
      </Header>
      <ScrollView horizontal >
        <Tournament>
          {data.tournament.rounds.map(round => (
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
    </>
  );
};

export default Bracket;
