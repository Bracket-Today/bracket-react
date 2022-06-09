import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import {
  SafeAreaView,
  ScrollView,
  Text
} from 'react-native';

import { Router } from 'app/src/utils/routing';
import Routes from 'app/src/routes';
import useClientSetup from 'app/src/hooks/useClientSetup';

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
    <Router>
      <ApolloProvider client={client}>
        <SafeAreaView>
          <ScrollView>
            <Routes />
          </ScrollView>
        </SafeAreaView>
      </ApolloProvider>
    </Router>
  );
};

export default App;
