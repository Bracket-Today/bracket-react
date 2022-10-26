import React from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';

import { Link } from 'app/src/utils/routing';
import { HeaderText } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import fonts from 'app/src/styles/fonts';

const CONTAINER_STYLES = `
  background-color: ${colors.button};
  width: 200px;
  padding: 6px;
  border-radius: 6px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Container = styled(View)`
  ${CONTAINER_STYLES}
`;

const PressableContainer = styled(Pressable)`
  ${CONTAINER_STYLES}
`;

const ButtonText = styled(HeaderText)`
  font-family: '${fonts.header}';
  font-size: 18px;
  color: white;
  font-weight: 800;
  text-decoration-line: none;
  text-align: center;
`;

export const Button = ({ to, label, dangerous, inline, wide, ...props }) => {
  props.style ||= {};
  const textStyle = {};

  if ('Cancel' === props.type) {
    props.style.backgroundColor ||= '#505050';
    label ||= 'Cancel';
  } else if (dangerous) {
    props.style.backgroundColor ||= colors.danger;
  }

  if (inline) {
    props.style.marginTop = 0;
    props.style.maringBottom = 0;
    textStyle.fontSize = 14;
  }

  if (wide) {
    props.style.width = '100%';
  }

  const content = <ButtonText style={textStyle}>{label}</ButtonText>;

  if (to) {
    return (
      <Container {...props}>
        <Link to={to} style={{textDecoration: 'none'}}>{content}</Link>
      </Container>
    );
  } else {
    return <PressableContainer {...props}>{content}</PressableContainer>;
  }

  return content;
}
