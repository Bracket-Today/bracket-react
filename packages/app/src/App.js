import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { View, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';

import { Router } from 'app/src/utils/routing';
import Routes from 'app/src/routes';
import { Text } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import useClientSetup from 'app/src/hooks/useClientSetup';
import ErrorBoundary from 'app/src/components/ErrorBoundary';

import Menu from 'app/src/components/Menu';
import Footer from 'app/src/components/Footer';

const Screen = styled(View)`
  background-color: ${colors.screen};
`;

const Container = styled(SafeAreaView)`
  display: flex;
  height: 100%;
`;

const Content = styled(ScrollView)`
  background-color: white;
  padding: 10px;
`;

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
          <Screen>
            <Container>
              <Menu />
              <Content>
                <ErrorBoundary>
                  <Routes />
                </ErrorBoundary>
              </Content>
              <Footer />
            </Container>
          </Screen>
        </ApolloProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
