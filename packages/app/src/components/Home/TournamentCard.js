import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Text, HeaderText } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import { Link, useNavigate } from 'app/src/utils/routing';
import Contest from 'app/src/components/Bracket/Contest';

const Card = styled(View)`
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.headerText};
  border-radius: 5px;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 300px;
  padding: 10px;
  height: 100%;
  max-height: 260px;
`;

const Name = styled(Text)`
  font-size: 20px;
`;

const Detail = ({ tournament, refetch }) => {
  const navigate = useNavigate();

  if ('Active' == tournament.status) {
    return (
      <>
        <Text>Round {tournament.round.number}</Text>
        <View>
          {tournament.round.contests.slice(0, 2).map(contest => (
            <Contest
              key={contest.id}
              contest={contest}
              refetch={() => navigate(`/bracket/${tournament.id}`)}
            />
          ))}
        </View>
      </>
    );
  } else {
    return <Text>{tournament.status}</Text>;
  }
};

const TournamentCard = ({ tournament }) => {
  return (
    <Card>
      <Link to={`/bracket/${tournament.id}`} style={{textDecoration: 'none'}}>
        <Name>{tournament.name}</Name>
      </Link>
      <Detail tournament={tournament} />
    </Card>
  );
};

export default TournamentCard;
