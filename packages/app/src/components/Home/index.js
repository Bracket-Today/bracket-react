import React from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { Text } from 'app/src/styles';

import { TOURNAMENTS } from './queries';
import TournamentCard from './TournamentCard';

const Container = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Home = () => {
  const { data, loading } = useQuery(
    TOURNAMENTS, { variables: { scopes: ['active'] } }
  );

  if (loading) { return <Text>Loading...</Text>; }

  return (
    <Container>
      {data.tournaments.map(tournament => (
        <View key={tournament.id}>
          <TournamentCard tournament={tournament} />
        </View>
      ))}
    </Container>
  );
};

export default Home;
