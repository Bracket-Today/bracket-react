import React from 'react';
import { useQuery } from '@apollo/client';
import { View } from 'react-native';
import styled from 'styled-components/native';

import DataState from 'app/src/components/DataState';
import { Link } from 'app/src/utils/routing';
import { Title, Subtitle } from 'app/src/styles';

import { VOTABLE_TOURNAMENTS } from './queries';
import Contest from './Contest';

export const Header = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Vote = () => {
  const { data, refetch, ...queryStatus } =
    useQuery(VOTABLE_TOURNAMENTS);

  return (
    <DataState data={data} {...queryStatus}>
      {data?.tournaments.map(tournament => (
        <>
          <Header>
            <Title>{tournament.name}</Title>
            <Subtitle>Round {tournament.round.number}</Subtitle>
          </Header>
          {tournament.rounds.map(round => (
            <React.Fragment key={round.number}>
              {round.contests.map(contest => (
                <React.Fragment key={contest.id}>
                  {contest.isActive && (
                    <Contest contest={contest} refetch={refetch} />
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </>
      ))}
      <Link to="/tournaments">
        <Subtitle>
          You've voted on everything. Want to create a Bracket? Click Here
        </Subtitle>
      </Link>
    </DataState>
  );
};

export default Vote;
