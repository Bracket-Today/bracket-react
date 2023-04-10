import React from 'react';
import { DateTime } from 'luxon';

import { Link } from 'app/src/utils/routing';
import { Card, Name } from 'app/src/components/Home/TournamentCard';

import { Text } from 'app/src/styles';

const month = iso => {
  const time = DateTime.fromISO(iso);
  return time.toFormat('MMMM yy');
};

const CompetitorCard = ({ competitor }) => {
  return (
    <Card>
      <Link
        to={competitor.tournament.bracketPath}
        style={{textDecoration: 'none'}}
      >
        <Name>{competitor.tournament.name}</Name>
      </Link>
      <Text>{competitor.tournament.statusDetail}</Text>
      <Text>{month(competitor.tournament.startAt)}</Text>
      {competitor.annotation && (
        <Text>{competitor.annotation}</Text>
      )}
    </Card>
  );
};

export default CompetitorCard;
