import React from 'react';
import { View } from 'react-native';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';

import { useParams } from 'app/src/utils/routing';
import { Header, Title, Subtitle, Text } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import { Container } from 'app/src/components/Home';

import { ENTITY } from './queries';
import CompetitorCard from './CompetitorCard';

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
        {data?.entity.annotation && (
          <Subtitle>{data?.entity.annotation}</Subtitle>
        )}
      </Header>
      <Container>
        {data?.entity.competitors.map(competitor => (
          <CompetitorCard key={competitor.id} competitor={competitor} />
        ))}
      </Container>
    </DataState>
  );
};

export default Entity;
