import { gql } from '@apollo/client';

export const TOURNAMENTS = gql`
  query Tournaments(
    $scopes: [String!]
  ) {
    tournaments(
      scopes: $scopes
    ) {
      id
      name
    }
  }
`;
