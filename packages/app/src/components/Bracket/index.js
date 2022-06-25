import React from 'react';
import { ScrollView, View, } from 'react-native';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { useParams } from 'app/src/utils/routing';
import { HeaderText, Text } from 'app/src/styles';

import Competitor from './Competitor';
import { TOURNAMENT } from './queries';

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
      </ScrollView>
    </>
  );
};

export default Bracket;
