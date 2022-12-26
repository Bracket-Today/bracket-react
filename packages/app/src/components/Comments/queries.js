import { gql } from '@apollo/client';

export const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    id
    user {
      username
    }
    body
    createdAt
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      comment {
        id
      }
    }
  }
`;
