import React from 'react';
import { useQuery } from '@apollo/client';

import { useParams } from 'app/src/utils/routing';
import { Header, Title, Subtitle } from 'app/src/styles';
import DataState from 'app/src/components/DataState';

import { USER_TOURNAMENT } from './queries';

const Tournament = () => {
  const { id } = useParams();

  const { data, refetch, ...queryStatus } =
    useQuery(USER_TOURNAMENT, { variables: { id } });

  return (
    <DataState data={data} {...queryStatus}>
      <Header>
        <Title>{data?.currentUser.tournament.name}</Title>
        <Subtitle>{data?.currentUser.tournament.status}</Subtitle>
      </Header>
    </DataState>
  );
};

export default Tournament;
