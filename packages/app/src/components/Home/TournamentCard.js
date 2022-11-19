import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Text, HeaderText } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import { Link, useNavigate } from 'app/src/utils/routing';
import Contest from 'app/src/components/Bracket/Contest';

export const Card = styled(View)`
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.featured ? colors.button : colors.screen};
  border-radius: 5px;
  padding: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  max-height: 300px;
  margin-left: 5px;
  margin-right: 5px;
  flex-grow: 1;
  flex-shrink: 1;
  width: 10%;
  min-width: 300px;
  background-color: #f9f9f9;
`;

export const Name = styled(Text)`
  font-size: 20px;
`;

const Highlight = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

const Section = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Detail = ({ tournament, refetch }) => {
  const navigate = useNavigate();

  if ('Active' === tournament.status) {
    return (
      <>
        <Text>Round {tournament.currentRoundByTime}</Text>
        <View>
          {tournament.summaryContests.map(contest => (
            <Contest
              key={contest.id}
              contest={contest}
              refetch={() => navigate(tournament.bracketPath)}
            />
          ))}
        </View>
      </>
    );
  } else if ('Closed' === tournament.status) {
    return (
      <>
        <Section>
          <Highlight>
            Winner: {tournament.summaryContests[0].winner?.entity.name}
          </Highlight>
        </Section>
        <Section>
          <Text>Voters: {tournament.votersCount}</Text>
          <Text>Votes: {tournament.votesCount}</Text>
          <Text>
            You Picked Winner: {tournament.currentUserVotedWinnerCount}/
            {tournament.contestsCount}
          </Text>
        </Section>
      </>
    );
  } else {
    return <Text>{tournament.status}</Text>;
  }
};

const TournamentCard = ({ tournament }) => {
  return (
    <Card featured={tournament.featured}>
      <Link to={tournament.bracketPath} style={{textDecoration: 'none'}}>
        <Name>{tournament.name}</Name>
      </Link>
      <Detail tournament={tournament} />
    </Card>
  );
};

export default TournamentCard;
