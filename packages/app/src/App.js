import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaView, ScrollView } from 'react-native';

import { Router } from 'app/src/utils/routing';
import Routes from 'app/src/routes';
import { Text } from 'app/src/styles';
import useClientSetup from 'app/src/hooks/useClientSetup';
import ErrorBoundary from 'app/src/components/ErrorBoundary';

const App = () => {
  const { client } = useClientSetup();

  if (!client) {
    return (
      <ScrollView>
        <Text>Initializing...</Text>
      </ScrollView>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <ApolloProvider client={client}>
          <SafeAreaView>
            <ScrollView>
              <ErrorBoundary>
                <Routes />
              </ErrorBoundary>
            </ScrollView>
          </SafeAreaView>
        </ApolloProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
