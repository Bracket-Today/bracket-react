import React, { useEffect, useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Text } from 'app/src/styles';
import colors from 'app/src/styles/colors';

import { SEARCH } from './queries';
import Result from './Result';

const Container = styled(View)`
  flex: 1;
  flex-direction: row;
  background-color: white;
  align-self: center;
  align-items: center;
  height: 32px;
  border-radius: 16px;
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 4px;
  margin-left: 36px;
  margin-right: 36px;
`;

const Input = styled(TextInput)`
  outline-width: 0px;
  outline-color: white;
  flex: 1
`;

const Results = styled(View)`
  position: absolute;
  top: 30px;
  left: 20px;
  background-color: white;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  padding-top: 5px;
`;

const Search = () => {
  const [term, setTerm] = useState('');
  const [getResults, { data }] = useLazyQuery(SEARCH);

  useEffect(() => {
    if (term && term.length > 2) {
      getResults({ variables: { term }});
    }
  }, [term]);

  return (
    <Container>
      <Input
        placeholder="Search"
        placeholderTextColor={colors.disabled}
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
      {term ? (
        <Pressable onPress={() => setTerm('')}>
          <FontAwesomeIcon
            icon={faXmark}
            color={colors.screen}
            size={20}
          />
        </Pressable>
      ) : (
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          color={colors.screen}
          size={20}
        />
      )}
      {data && term.length > 2 && data.search.length > 0 && (
        <Results>
          {data.search.map(result => (
            <Result
              key={`${result.__typename}-${result.id}`}
              result={result}
              setTerm={setTerm}
            />
          ))}
        </Results>
      )}
    </Container>
  );
};

export default Search;
