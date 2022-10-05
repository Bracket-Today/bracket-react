import React from 'react';
import { View } from 'react-native';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { useNavigate } from 'app/src/utils/routing';
import { Header, Subtitle } from 'app/src/styles';
import { Button } from 'app/src/elements/buttons';
import DataState from 'app/src/components/DataState';
import Announcements from 'app/src/components/Announcements';

import { TOURNAMENTS } from './queries';
import TournamentCard from './TournamentCard';

const Container = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Home = () => {
  const navigate = useNavigate();

  const { data, ...queryStatus } = useQuery(
    TOURNAMENTS, { variables: { scopes: ['activeAndRecent'] } }
  );

  return (
    <>
      <Helmet>
        <title>bracket.today</title>
      </Helmet>
      <Header>
        <Announcements />
        <Button
          label="Vote on all active contests"
          onPress={() => navigate('/bracket/vote')}
          wide
        />
        <Subtitle>Or choose a bracket below</Subtitle>
      </Header>
      <Container>
        <DataState data={data} {...queryStatus}>
          {data?.tournaments.map(tournament => (
            <View key={tournament.id}>
              <TournamentCard tournament={tournament} />
            </View>
          ))}
        </DataState>
      </Container>
    </>
  );
};

export default Home;
