import React from 'react';
import { Text, View, } from 'react-native';
import { useQuery } from '@apollo/client';

import { Link } from 'app/src/utils/routing';

import { TOURNAMENTS } from './queries';

const Home = () => {
  const { data, loading } = useQuery(TOURNAMENTS);

  if (loading) { return <Text>Loading...</Text>; }

  return (
    <View>
      {data.tournaments.map(tournament => (
        <View key={tournament.id}>
          <Link to={`/bracket/${tournament.id}`}>
            <Text>{tournament.name}</Text>
          </Link>
        </View>
      ))}
    </View>
  );
};

export default Home;
