import { gql } from '@apollo/client';

import { COMPETITOR_FIELDS } from 'app/src/components/Competitors/queries';
import { CONTEST_FIELDS } from 'app/src/components/Bracket/queries';

export const TOURNAMENT_CORE_FIELDS = gql`
  fragment TournamentCoreFields on Tournament {
    id
    bracketPath
    name
    notes
    status
    visibility
    roundDurationQuantity
    roundDurationUnit
    startAt
  }
`;

const TOURNAMENT_FIELDS = gql`
  ${TOURNAMENT_CORE_FIELDS}
  ${COMPETITOR_FIELDS}
  ${CONTEST_FIELDS}
  fragment TournamentFields on Tournament {
    ...TournamentCoreFields
    basedOn {
      name
      bracketPath
    }
    competitors {
      ...CompetitorFields
    }
    firstRoundPreview {
      ...ContestFields
    }
  }
`;

export const USER_TOURNAMENT = gql`
  ${TOURNAMENT_FIELDS}
  query UserTournaments($id: ID!) {
    currentUser {
      registered
      tournament(id: $id) {
        ...TournamentFields
      }
    }
  }
`;

export const USER_TOURNAMENTS = gql`
  ${TOURNAMENT_CORE_FIELDS}
  query UserTournaments {
    currentUser {
      tournaments {
        ...TournamentCoreFields
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

export const DELETE_TOURNAMENT = gql`
  mutation DeleteTournament($input: DeleteTournamentInput!) {
    deleteTournament(input: $input) {
      errors { path, message }
    }
  }
`;

export const CLONE_TOURNAMENT = gql`
  ${TOURNAMENT_FIELDS}
  mutation CloneTournament($input: CloneTournamentInput!) {
    cloneTournament(input: $input) {
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

export const SCHEDULE_TOURNAMENT = gql`
  ${TOURNAMENT_FIELDS}
  mutation ScheduleTournament($input: ScheduleTournamentInput!) {
    scheduleTournament(input: $input) {
      tournament {
        ...TournamentFields
      }
    }
  }
`;

export const UPDATE_TOURNAMENT = gql`
  ${TOURNAMENT_FIELDS}
  mutation UpdateTournament($input: UpdateTournamentInput!) {
    updateTournament(input: $input) {
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

export const CREATE_COMPETITORS = gql`
  mutation CreateCompetitors($input: CreateCompetitorsInput!) {
    createCompetitors(input: $input) {
      tournament {
        id
      }
    }
  }
`;
