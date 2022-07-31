import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import DataTable from '@preflighttech/preflight-tables';
import { useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';

import colors from 'app/src/styles/colors';
import { Title, Text } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import { Link, useNavigate } from 'app/src/utils/routing';
import { Button } from 'app/src/elements/buttons';
import Input from 'app/src/elements/inputs';

import { USER_TOURNAMENTS, CREATE_TOURNAMENT } from './queries';

const Header = styled(View)`
  border-top-style: solid;
  border-top-color: black;
  border-top-width: 2px;
  margin-top: 10px;
  padding-top: 10px;
`;

const columns = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'actions',
    label: 'Actions',
    sort: 'prevent',
    content: ({ entry }) => (
      <>
        {'Closed' !== entry.status && (
          <Link to={`/tournaments/${entry.id}`}>
            <Text>Edit</Text>
          </Link>
        )}
      </>
    )
  }
];

const Tournaments = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const { data, ...queryStatus } = useQuery(USER_TOURNAMENTS);
  const [createTournament] = useMutation(CREATE_TOURNAMENT, {
    onCompleted: data => {
      navigate(`/tournaments/${data.createTournament.tournament.id}`);

      Toast.show({
        type: 'success',
        text1: 'Awesome!',
        text2: 'You can add competitors now',
      });
    }
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: '', }
  });

  const onSubmit = data => {
    createTournament({ variables: { input: data } });
  };

  return (
    <>
      {submitting ? (
        <ActivityIndicator size="large" color={colors.screen} />
      ) : (
        <View>
          <Input.Text
            label="Suggest a Tournament:"
            name="name"
            placeholder="What do you want to call it?"
            rules={{required: true}}
            control={control}
            errors={errors}
          />

          <Button
            label="Build Tournament"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      )}
      <DataState data={data} {...queryStatus}>
        <Header>
          <Title>My Tournaments</Title>
        </Header>
        {data && (
          <DataTable.Simple
            data={data.currentUser.tournaments}
            columns={columns}
          />
        )}
      </DataState>
    </>
  );
};

export default Tournaments;
