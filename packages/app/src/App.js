import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import {
  ActivityIndicator,
  View,
  SafeAreaView,
  ScrollView
} from 'react-native';
import styled from 'styled-components/native';

import { ClientProvider, ClientContext } from './contexts/ClientContext';
import { Router } from 'app/src/utils/routing';
import Routes from 'app/src/routes';
import { Text } from 'app/src/styles';
import colors from 'app/src/styles/colors';
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
  return (
    <ErrorBoundary>
      <ClientProvider>
        <ClientContext.Consumer>
          {ctx => ctx.client ? (
            <Router>
              <ApolloProvider client={ctx.client}>
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
          ) : (
            <ScrollView>
              <ActivityIndicator size="large" color={colors.screen} />
            </ScrollView>
          )}
        </ClientContext.Consumer>
      </ClientProvider>
    </ErrorBoundary>
  );
};

export default App;
