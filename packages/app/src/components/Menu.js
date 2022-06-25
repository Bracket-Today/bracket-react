import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Text } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import { Link } from 'app/src/utils/routing';

const Container = styled(View)`
  padding-bottom: 10px;
  flex-direction: row;
  background-color: ${colors.screen};
  border-bottom-color: white;
  border-bottom-width: 1px;
`;

const MiniBracket = styled(View)`
  margin-top: 10px;
  height: 44px;
  width: 30px;
  border-width: 4px;
  border-color: white;
  border-left-style: none;
  border-left-width: 0px;
`;

const Title = styled(Text)`
  font-size: 36px;
  text-decoration-line: underline;
  font-weight: 600;
  color: white;
`;

const Menu = () => {
  return (
    <Container>
      <MiniBracket />
      <Link to="/">
        <Title>bracket.today</Title>
      </Link>
    </Container>
  );
};

export default Menu;
