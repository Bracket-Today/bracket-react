import { gql } from '@apollo/client';

const TOURNAMENT_FIELDS = gql`
  fragment TournamentFields on Tournament {
    id
    name
    status
    visibility
    competitors {
      id
      seed
      entity {
        id
        name
      }
    }
  }
`;

export const USER_TOURNAMENT = gql`
  ${TOURNAMENT_FIELDS}
  query UserTournaments($id: ID!) {
    currentUser {
      tournament(id: $id) {
        ...TournamentFields
      }
    }
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

export const RANDOM_TOURNAMENT_SEEDS = gql`
  ${TOURNAMENT_FIELDS}
  mutation RandomTournamentSeeds($input: RandomTournamentSeedsInput!) {
    randomTournamentSeeds(input: $input) {
      tournament {
        ...TournamentFields
      }
    }
  }
`;

export const UPDATE_TOURNAMENT_SEEDS = gql`
  ${TOURNAMENT_FIELDS}
  mutation UpdateTournamentSeeds($input: UpdateTournamentSeedsInput!) {
    updateTournamentSeeds(input: $input) {
      tournament {
        ...TournamentFields
      }
    }
  }
`;

export const UPDATE_TOURNAMENT_VISIBILITY = gql`
  ${TOURNAMENT_FIELDS}
  mutation UpdateTournamentVisibility(
    $input: UpdateTournamentVisibilityInput!
  ) {
    updateTournamentVisibility(input: $input) {
      tournament {
        ...TournamentFields
      }
    }
  }
`;

export const ENTITIES = gql`
  query Entities($term: String!) {
    entities(term: $term) {
      id
      name
    }
  }
`;

export const CREATE_COMPETITOR = gql`
  mutation CreateCompetitor($input: CreateCompetitorInput!) {
    createCompetitor(input: $input) {
      competitor {
        id
      }
    }
  }
`;

export const REMOVE_COMPETITOR = gql`
  mutation RemoveCompetitor($input: RemoveCompetitorInput!) {
    removeCompetitor(input: $input) {
      competitor {
        id
      }
    }
  }
`;
