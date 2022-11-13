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
    username
    instagramHandle
    twitterHandle
    dailyReminder
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

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      authenticatable {
        id
      }
    }
  }
`;

export const CONFIRM_REGISTRATION = gql`
  ${CREDENTIAL_FIELDS}
  mutation UserConfirmRegistrationWithToken($confirmationToken: String!) {
    userConfirmRegistrationWithToken(confirmationToken: $confirmationToken) {
      credentials {
        ...CredentialFields
      }
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

export const UPDATE_CURRENT_USER = gql`
  ${USER_FIELDS}
  mutation UpdateCurrentUser($input: UpdateCurrentUserInput!) {
    updateCurrentUser(input: $input) {
      user {
        ...UserFields
      }
      errors { path, message }
    }
  }
`;
