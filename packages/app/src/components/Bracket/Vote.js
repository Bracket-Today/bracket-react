import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';

import DataState from 'app/src/components/DataState';
import { Link, useNavigate } from 'app/src/utils/routing';
import { Title, Subtitle } from 'app/src/styles';

import { VOTABLE_TOURNAMENTS } from './queries';
import Contest from './Contest';

export const Header = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const anyActive = tournament => (
  tournament.rounds.find(
    round => round.contests.find(
      contest => contest.isActive && !contest.currentUserVote
    )
  )
);

const Vote = () => {
  const navigate = useNavigate();

  const { data, ...queryStatus } =
    useQuery(VOTABLE_TOURNAMENTS);

  const tournaments = (data?.tournaments || []).
    filter(tournament => anyActive(tournament));

  const goToCreate = () => {
    navigate('/tournaments');
    Toast.hide();
  };

  useEffect(() => {
    if (data?.tournaments.length && 0 === tournaments.length) {
      //Had torunaments when page loaded but now all filtered.
      Toast.show({
        type: 'success',
        text1: 'Create a bracket',
        text2: "There's nothing more to vote on.",
        visibilityTime: 5000,
        onPress: () => goToCreate(),
      });
    }
  }, [data, tournaments]);

  return (
    <DataState data={data} {...queryStatus}>
      {tournaments.map(tournament => (
        <React.Fragment key={tournament.id}>
          <Header>
            <Link to={tournament.bracketPath} style={{textDecoration: 'none'}}>
              <Title>{tournament.name}</Title>
            </Link>
            <Subtitle>Round {tournament.round.number}</Subtitle>
          </Header>
          {tournament.rounds.map(round => (
            <React.Fragment key={round.number}>
              {round.contests.map(contest => (
                <React.Fragment key={contest.id}>
                  {contest.isActive && (
                    <Contest contest={contest} />
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
      {data && 0 === data.tournaments.length && (
        <Link to="/tournaments">
          <Subtitle>
            You've voted on everything. Want to create a Bracket? Click Here
          </Subtitle>
        </Link>
      )}
    </DataState>
  );
};

export default Vote;
