import React from 'react';
import { ActivityIndicator } from 'react-native';

import colors from 'app/src/styles/colors';
import { useNavigate } from 'app/src/utils/routing';

import { ErrorMessage } from './ErrorBoundary';

const DataState = ({ data, loading, error, children }) => {
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

  return <>{children}</>;
};

export default DataState;
