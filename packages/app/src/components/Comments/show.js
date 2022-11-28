import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { DateTime } from 'luxon';

import { Text } from 'app/src/styles';
import colors from 'app/src/styles/colors';

const Container = styled(View)`
  margin-left: ${props => 10 * props.level}px;
`;

const Header = styled(View)`
  flex-direction: row;
`;

const Username = styled(Text)`
  font-weight: 800;
  color: ${colors.screen};
  margin-right: 10px;
`;

const Time = styled(Text)`
  font-weight: 800;
  color: ${colors.disabled};
`;

const Body = styled(View)`
  border-left-width: 2px;
  border-left-color: ${colors.disabled};
  border-left-style: solid;
  padding-left: 10px;
  margin-top: 4px;
  margin-bottom: 6px;
`;

const BodyText = styled(Text)`
`;

const Comment = ({ comment, level }) => {
  const createdAt = DateTime.fromISO(comment.createdAt);

  return (
    <Container level={level}>
      <Header>
        {level > 0 && <Text>↪ </Text>}
        <Username>{comment.user.username}</Username>
        <Time>{createdAt.toRelative()}</Time>
      </Header>
      <Body>
        <BodyText>{comment.body}</BodyText>
      </Body>
      {comment.children?.map(child => (
        <Comment key={child.id} comment={child} level={level + 1} />
      ))}
    </Container>
  );
};

export default Comment;
