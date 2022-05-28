import React from 'react';
import {
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import Bracket from 'app/src/components/Bracket';

const client = new ApolloClient({
  uri: 'http://localhost:4008/api/1/graphql',
  cache: new InMemoryCache()
});

const App = () => {
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
