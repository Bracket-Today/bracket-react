import React from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { Text } from 'app/src/styles';
import DataState from 'app/src/components/DataState';

import { TOURNAMENTS } from './queries';
import TournamentCard from './TournamentCard';

const Container = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Home = () => {
  const { data, ...queryStatus } = useQuery(
    TOURNAMENTS, { variables: { scopes: ['active'] } }
  );

  return (
    <Container>
      <DataState data={data} {...queryStatus}>
        {data?.tournaments.map(tournament => (
          <View key={tournament.id}>
            <TournamentCard tournament={tournament} />
          </View>
        ))}
      </DataState>
    </Container>
  );
};

export default Home;
