import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { Header, Title, Text } from 'app/src/styles';
import DataState from 'app/src/components/DataState';

import { CURRENT_USER } from './queries';

const BoldText = styled(Text)`
  font-weight: 800;
`;

const Profile = () => {
  const { data, refetch, ...queryStatus } = useQuery(CURRENT_USER);

  return (
    <DataState data={data} {...queryStatus}>
      <Header>
        <Title>My Profile</Title>
      </Header>
      <BoldText>
        Sign In Link:
        https://www.bracket.today/login/{data?.currentUser.loginCode}
      </BoldText>
      <Text>
        Use the link above to sign in on another device or save to ensure you
        can login later.
      </Text>
    </DataState>
  );
};

export default Profile;
