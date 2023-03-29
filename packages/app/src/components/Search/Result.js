import React from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faMagnifyingGlass,
  faXmark,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'app/src/utils/routing';
import { Text } from 'app/src/styles';
import colors from 'app/src/styles/colors';

const Container = styled(View)`
  flex-direction: row;
  column-gap: 10px;
  margin: 5px;
`;

const Name = styled(View)`
  width: 300px;
`;

const NameText = styled(Text)`
  font-weight: 600;
`;

const Detail = styled(View)`
  width: 300px;
`;

const Result = ({ result, setTerm }) => {
  return (
    <Pressable
      onPress={() => setTerm('')}
      style={state => (
        { backgroundColor: state.hovered ? 'lightgray' : 'none' }
      )}
    >
      <Link to={result.bracketPath}>
        <Container>
          <FontAwesomeIcon
            icon={faRightToBracket}
            color={colors.screen}
            size={20}
          />
          <Name>
            <NameText>{result.name}</NameText>
          </Name>
          <Detail>
            <Text>{result.status}</Text>
          </Detail>
        </Container>
      </Link>
    </Pressable>
  );
};

export default Result;
