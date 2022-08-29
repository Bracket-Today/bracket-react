import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { Header, Title, Text } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import ClientContext from 'app/src/contexts/ClientContext';
import Tabs from 'app/src/elements/Tabs';

import Login from './Login';
import Logout from './Logout';
import Register from './Register';

const BoldText = styled(Text)`
  font-weight: 800;
`;

const LOGIN_TABS = [
  { key: 'register', label: 'Register', component: <Register /> },
  { key: 'login', label: 'Login', component: <Login /> },
];

const Profile = () => {
  const { currentUser, isLoggedIn } = useContext(ClientContext);

  return (
    <DataState data={currentUser} loading={!currentUser}>
      <Header>
        <Title>My Profile</Title>
      </Header>

      {currentUser?.loginCode && (
        <>
          <BoldText>
            Sign In Link:
            https://bracket.today/login/{currentUser.loginCode}
          </BoldText>
          <Text>
            Use the link above to sign in on another device or save to ensure you
            can login later, or register below to login with your email.
          </Text>
        </>
      )}

      {isLoggedIn ?  <Logout /> : <Tabs tabs={LOGIN_TABS} />}
    </DataState>
  );
};

export default Profile;
