import React from 'react';
import { View } from 'react-native';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';

import { useParams } from 'app/src/utils/routing';
import { Header, Title, Text } from 'app/src/styles';
import DataState from 'app/src/components/DataState';

import { ENTITY } from './queries';

const Entity = () => {
  const { id } = useParams();

  const { data, ...queryStatus } = useQuery(ENTITY, { variables: { id } });

  return (
    <DataState data={data} {...queryStatus}>
      <Helmet>
        <title>{data?.entity.name}</title>
      </Helmet>
      <Header>
        <Title>{data?.entity.name}</Title>
      </Header>
    </DataState>
  );
};

export default Entity;
