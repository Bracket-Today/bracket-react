import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { useParams } from 'app/src/utils/routing';
import { Header, Title, Subtitle, Text } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import durationString from 'app/src/utils/durationString';

import { TOURNAMENT } from './queries';
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

const Bracket = () => {
  const { id } = useParams();
  const [updatedAt, setUpdatedAt] = useState();
  const [remaining, setRemaining] = useState();

  const { data, refetch, ...queryStatus } =
    useQuery(TOURNAMENT, { variables: { id } });

  useEffect(() => {
    const interval = setInterval(() => {
      if (updatedAt) {
        const elapsed = (Date.now() - updatedAt) / 1000;
        setRemaining(data.tournament.round.secondsRemaining - elapsed);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [updatedAt]);

  useEffect(() => {
    if ('Active' === data?.tournament.status) {
      setUpdatedAt(Date.now());
    }
  }, [data]);

  let statusDetail = data?.tournament.status;

  if ('Active' === data?.tournament.status) {
    statusDetail = `Round ${data.tournament.round.number}`
    if (remaining) {
      statusDetail += ` \u2013 ${durationString(remaining)} remaining.`;
    }
  } else if (data?.tournament.winner) {
    statusDetail = `WINNER: ${data.tournament.winner.entity.name}`;
  }

  return (
    <DataState data={data} {...queryStatus}>
      <Header>
        <Title>{data?.tournament.name}</Title>
        <Subtitle>
          {statusDetail}
        </Subtitle>
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
    </DataState>
  );
};

export default Bracket;
