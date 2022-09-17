import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Warning, WarningText } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import { useNavigate } from 'app/src/utils/routing';

import { ErrorMessage } from './ErrorBoundary';

const DataState = ({ data, loading, error, userErrors, children }) => {
  const navigate = useNavigate();

  if (loading && !data) {
    return <ActivityIndicator size="large" color={colors.screen} />;
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
