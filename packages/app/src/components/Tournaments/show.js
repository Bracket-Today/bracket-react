import React from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { useParams } from 'app/src/utils/routing';
import { Header, Title, Subtitle, Text } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import colors from 'app/src/styles/colors';

import { USER_TOURNAMENT } from './queries';
import Competitor from './Competitor';
import EntitySelect from './EntitySelect';

const AddCompetitor = styled(View)`
  margin-top: 10px
  border-top-style: solid;
  border-top-color: black;
  border-top-width: 1px;
`;

const Hint = styled(Text)`
  color: ${colors.disabled};
`;

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

      <Title>
        Competitors ({data?.currentUser.tournament.competitors.length})
      </Title>
      {data?.currentUser.tournament.competitors.map(competitor => (
        <Competitor
          key={competitor.id}
          competitor={competitor}
          refetch={refetch}
        />
      ))}

      <AddCompetitor>
        <Subtitle>Add Another</Subtitle>
        <Hint>
          Choose from the Autocomplete or Click the Checkbox to add.
        </Hint>
        <EntitySelect
          tournament={data?.currentUser.tournament}
          refetch={refetch}
        />
      </AddCompetitor>
    </DataState>
  );
};

export default Tournament;
