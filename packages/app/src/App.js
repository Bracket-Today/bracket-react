import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import {
  SafeAreaView,
  ScrollView,
  Text
} from 'react-native';

import Bracket from 'app/src/components/Bracket';
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
    <ApolloProvider client={client}>
      <SafeAreaView>
        <ScrollView>
          <Bracket />
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
