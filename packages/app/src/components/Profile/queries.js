import { gql } from '@apollo/client';

const CREDENTIAL_FIELDS = gql`
  fragment CredentialFields on Credential {
    accessToken
    client
    expiry
    tokenType
    uid
  }
`;

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    loginCode
  }
`;

export const CURRENT_USER = gql`
  ${USER_FIELDS}
  query CurrentUser {
    currentUser {
      ...UserFields
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

export const LOGIN = gql`
  ${CREDENTIAL_FIELDS}
  mutation UserLogin(
    $email: String!
    $password: String!
  ) {
    userLogin(
      email: $email
      password: $password
    ) {
      credentials {
        ...CredentialFields
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation UserLogout {
    userLogout {
      authenticatable {
        id
      }
    }
  }
`;
