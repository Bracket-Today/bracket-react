import React from 'react';
import { Text, View, } from 'react-native';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { useParams } from 'app/src/utils/routing';

import Competitor from './Competitor';
import { TOURNAMENT } from './queries';

const Tournament = styled(View)`
  display: flex;
  flex-direction: row;
`;

const Round = styled(View)`
  display: flex;
  flex-direction: column;
  min-width: 100px;
`;

const Contest = styled(View)`
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: auto;
  margin-bottom: auto;
`;

const Upper = styled(View)`
  border-bottom-width: 2px;
  border-bottom-color: black;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const Lower = styled(Upper)`
  border-right-width: 1px;
  border-right-color: black;
`;

const Bracket = () => {
  const { id } = useParams();

  const { data, loading, refetch } =
    useQuery(TOURNAMENT, { variables: { id } });

  if (loading) { return <Text>Loading...</Text>; }

  return (
    <View>
      <Text>{data.tournament.name}</Text>
      <Tournament>
        {data.tournament.rounds.map(round => (
          <Round key={round.number}>
            <Text>Round #{round.number}</Text>
            {round.contests.map(contest => (
              <View key={contest.id} style={{flex: round.multiplier}}>
              <Contest>
                <Upper>
                  <Competitor
                    competitor={contest.upper}
                    contest={contest}
                    refetch={refetch}
                  />
                </Upper>
                <Lower>
                  <Competitor
                    competitor={contest.lower}
                    contest={contest}
                    refetch={refetch}
                  />
                </Lower>
              </Contest>
              </View>
            ))}
          </Round>
        ))}
      </Tournament>
    </View>
  );
};

export default Bracket;
