import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components/native';

import { Subtitle } from 'app/src/styles';

import Comment from './show';
import NewComment from './new';

const Header = styled(View)`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 6px;
`;

const Title = styled(Subtitle)`
  margin-right: 6px;
`;

const Comments = ({ tournament, refetch }) => {
  const [showNew, setShowNew] = useState(false);

  return (
    <>
      <Header>
        <Title>Comments</Title>
        {tournament.makeComments && (
          <Pressable onPress={() => setShowNew(!showNew)}>
            <FontAwesomeIcon icon={faComment} size={20} />
          </Pressable>
        )}
      </Header>

      {showNew && (
        <NewComment
          tournament={tournament}
          handleHide={() => { refetch(); setShowNew(false); }}
        />
      )}

      {tournament.comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          level={0}
          tournament={tournament}
          refetch={refetch}
        />
      ))}
    </>
  );
};

export default Comments;
