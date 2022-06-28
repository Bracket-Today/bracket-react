import React from 'react';
import { ActivityIndicator } from 'react-native';

import colors from 'app/src/styles/colors';

import { ErrorMessage } from './ErrorBoundary';

const DataState = ({ data, loading, error, children }) => {
  if (loading && !data) {
    return <ActivityIndicator size="large" color={colors.screen} />;
  }

  if (error) {
    const message = error.message || 'Unknown Error';
    return <ErrorMessage message={message} />;
  }

  return <>{children}</>;
};

export default DataState;
