import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { DateTime } from 'luxon';

import { Text, Hint } from 'app/src/styles';

import { Card, Name } from './TournamentCard';

const Tournament = styled(View)`
  margin-top: 10px;
`;

const StartTime = styled(Hint)`
  font-size: 12px;
`;

const formattedStart = tournament => {
  const time = DateTime.fromISO(tournament.startAt);
  return time.toFormat('EEEE, ') +
    time.toLocaleString(DateTime.DATETIME_FULL);
};

const UpcomingCard = ({ tournaments }) => {
  return (
    <Card>
      <Name>Coming Soon</Name>
      {tournaments.slice(0, 4).map(tournament => (
        <Tournament key={tournament.id}>
          <Text>{tournament.name}</Text>
          <StartTime>{formattedStart(tournament)}</StartTime>
        </Tournament>
      ))}
    </Card>
  );
};

export default UpcomingCard;
