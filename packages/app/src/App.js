import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import {
  ActivityIndicator,
  View,
  SafeAreaView,
  ScrollView
} from 'react-native';
import styled from 'styled-components/native';
import DataTable from '@preflighttech/preflight-tables';
import Toast, { SuccessToast } from 'react-native-toast-message';

import { ClientProvider, ClientContext } from './contexts/ClientContext';
import { Router } from 'app/src/utils/routing';
import Routes from 'app/src/routes';
import { Text } from 'app/src/styles';
import tableStyles from 'app/src/styles/table';
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

const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      text1Style={{ fontSize: 22 }}
      text2Style={{ fontSize: 16 }}
    />
  ),
};

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
                      <DataTable.Provider
                        pageLength={25}
                        lengthMenu={ [10, 25, 50, 'All'] }
                        styles={tableStyles}
                      >
                        <ErrorBoundary>
                          <Routes />
                        </ErrorBoundary>
                      </DataTable.Provider>
                    </Content>
                    <Footer />
                  </Container>
                  <Toast config={toastConfig} />
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
