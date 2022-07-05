import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { Link, useNavigate, useParams } from 'app/src/utils/routing';
import { Header, Title, Text } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import ClientContext from 'app/src/contexts/ClientContext';
import { Button } from 'app/src/elements/buttons';

import { LOGIN_CODE } from './queries';

const LoginCode = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { client, updateUuid } = useContext(ClientContext);

  const { data, refetch, ...queryStatus } =
    useQuery(LOGIN_CODE, { variables: { code } });

  useEffect(() => {
    // Client has been updated with a new UUID.
    if (data) { navigate('/'); }
  }, [client]);

  const changeLogin = () => {
    updateUuid(data.loginCode.uuid);
  }

  let content = null;

  if (data && !data.loginCode) {
    content = (
      <>
        <Text>Sorry, we couldn't find this login</Text>
        <Button to="/" label="Head Home to Vote" />
      </>
    );
  } else if (data?.loginCode?.isCurrentUser) {
    content = (
      <>
        <Text>You're already logged in as this user</Text>
        <Button to="/" label="Head Home to Vote" />
      </>
    );
  } else if (0 === data?.currentUser.votesCount) {
    changeLogin();
    content = <Text>Processing...</Text>;
  } else if (data?.currentUser.votesCount) {
    content = (
      <>
        <Text style={{fontWeight: 800}}>
          Are you sure you want to switch accounts on this device?
        </Text>

        <Text>
          If you want to be able to switch back, make sure to copy this link
          now:
          https://bracket.today/login/{data?.currentUser.loginCode}
        </Text>

        <Button onPress={changeLogin} label="Yes, Change My Login" />
        <Button to="/" type="Cancel" label="No, Don't Change Logins" />
      </>
    );
  }

  return (
    <DataState data={data} {...queryStatus}>
      <Header>
        <Title>Switch Login</Title>
      </Header>
      {content}
    </DataState>
  );
};

export default LoginCode;
