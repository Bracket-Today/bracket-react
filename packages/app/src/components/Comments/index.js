import React from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components/native';

import { Subtitle } from 'app/src/styles';

import Comment from './show';

const Header = styled(View)`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 6px;
`;

const Title = styled(Subtitle)`
  margin-right: 6px;
`;

const Comments = ({ tournament }) => {
  return (
    <>
      <Header>
        <Title>Comments</Title>
        {tournament.makeComments && (
          <FontAwesomeIcon icon={faComment} size={20} />
        )}
      </Header>

      {tournament.comments.map(comment => (
        <Comment key={comment.id} comment={comment} level={0} />
      ))}
    </>
  );
};

export default Comments;
