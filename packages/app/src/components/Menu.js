import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import MediaQuery from 'react-native-web-responsive';

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

const ItemsLarge = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 40px;
  justify-content: flex-end;
`;

const ItemsSmall = styled(View)`
`;

const MenuItem = styled(View)`
  margin-right: 20px;
`;

const MenuItemText = styled(Text)`
  color: white;
  font-size: 20px;
`;

const MenuIcon = styled(Pressable)`
  flex: 1;
  align-self: flex-start;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 24px;
`;

const MenuLine = styled(View)`
  width: 24px;
  height: 3px;
  border-radius: 2px;
  margin: 2px 0;
  cursor: pointer;
  background-color: white;
`;

const MenuItems = () => {
  return (
    <>
      <MenuItem>
        <Link to="/tournaments">
          <MenuItemText>Create</MenuItemText>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/me">
          <MenuItemText>Profile</MenuItemText>
        </Link>
      </MenuItem>
    </>
  );
}

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Container>
        <MiniBracket />
        <Link to="/">
          <Title>bracket.today</Title>
        </Link>

        <MediaQuery minWidth={800}>
          <ItemsLarge>
            <MenuItems />
          </ItemsLarge>
        </MediaQuery>

        <MediaQuery maxWidth={799}>
          <MenuIcon onPress={() => setShowMenu(!showMenu)}>
            <MenuLine />
            <MenuLine />
            <MenuLine />
          </MenuIcon>
        </MediaQuery>
      </Container>

      {showMenu && (
        <ItemsSmall>
          <MenuItems />
        </ItemsSmall>
      )}
    </>
  );
};

export default Menu;
