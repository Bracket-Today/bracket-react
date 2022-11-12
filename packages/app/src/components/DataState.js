import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

import { Warning, WarningText } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import { useNavigate } from 'app/src/utils/routing';

import { ErrorMessage } from './ErrorBoundary';

const ActivityContainer = styled(View)`
  margin-left: auto;
  margin-right: auto;
  padding-top: 6px;
`;

const DataState = ({ data, loading, error, userErrors, children }) => {
  const navigate = useNavigate();

  if (loading && !data) {
    return (
      <ActivityContainer>
        <ActivityIndicator size="large" color={colors.screen} />
      </ActivityContainer>
    );
  }

  if (error) {
    const message = error.message || 'Unknown Error';

    if ('NOT_FOUND' === error.graphQLErrors?.[0]?.extensions?.code) {
      navigate('/');
    }

    return <ErrorMessage message={message} />;
  }

  return (
    <>
      {userErrors && userErrors.length > 0 && (
        <Warning>
          {userErrors.map(error => (
            <WarningText key={error}>
              {error.path[error.path.length - 1]}
              {' '}
              {error.message}
            </WarningText>
          ))}
        </Warning>
      )}
      {children}
    </>
  );
};

export default DataState;
