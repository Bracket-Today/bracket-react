import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';

import { Subtitle } from 'app/src/styles';
import colors from 'app/src/styles/colors';

const Container = styled(View)`
  margin-top: 10px;
  padding-top: 10px;
`;

const Labels = styled(View)`
  flex-direction: row;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: 1px;
  margin-bottom: 10px;
`;

const Label = styled(Pressable)`
  flex: 1;
  max-width: 150px;
  padding-left: 10px;
  border-right-style: solid;
  border-right-color: black;
  border-right-width: 1px;
`;

const LabelText = styled(Subtitle)`
  flex: 1;
  max-width: 150px;
  color: ${props => props.selected ? colors.button : colors.disabled};
`;

const Tabs = ({ tabs }) => {
  const [selected, setSelected] = useState(tabs[0]);
  console.log(selected.key);

  return (
    <Container>
      <Labels>
        {tabs.map(tab => (
          <Label
            key={tab.key}
            selected={tab.key === selected.key}
            onPress={() => setSelected(tab)}
          >
            <LabelText selected={tab.key === selected.key}>
              {tab.label}
            </LabelText>
          </Label>
        ))}
      </Labels>

      {selected.component}
    </Container>
  );
};

export default Tabs;
