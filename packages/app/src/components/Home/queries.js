import { gql } from '@apollo/client';

export const TOURNAMENTS = gql`
  query Tournaments {
    tournaments {
      id
      name
    }
  }
`;
