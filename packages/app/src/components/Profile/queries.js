import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      loginCode
    }
  }
`;

export const LOGIN_CODE = gql`
  query LoginCode($code: String!) {
    loginCode(code: $code) {
      uuid
      isCurrentUser
    }
    currentUser {
      loginCode
      votesCount
    }
  }
`;
