import { gql } from '@apollo/client';

const TOURNAMENT_FIELDS = gql`
  fragment TournamentFields on Tournament {
    id
    name
    status
  }
`;

export const USER_TOURNAMENTS = gql`
  ${TOURNAMENT_FIELDS}
  query UserTournaments {
    currentUser {
      tournaments {
        ...TournamentFields
      }
    }
  }
`;

export const CREATE_TOURNAMENT = gql`
  ${TOURNAMENT_FIELDS}
  mutation CreateTournament($input: CreateTournamentInput!) {
    createTournament(input: $input) {
      tournament {
        ...TournamentFields
      }
      errors { path, message }
    }
  }
`;
