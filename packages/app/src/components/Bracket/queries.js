import { gql } from '@apollo/client';

const COMPETITOR_FIELDS = gql`
  fragment CompetitorFields on Competitor {
    id
    seed
    entity {
      name
    }
  }
`;

export const ROUND_FIELDS = gql`
  ${COMPETITOR_FIELDS}
  fragment RoundFields on Round {
    number
    multiplier
    contests {
      id
      round
      sort
      isActive
      upper {
        ...CompetitorFields
      }
      lower {
        ...CompetitorFields
      }
      winner {
        ...CompetitorFields
      }
      currentUserVote {
        ...CompetitorFields
      }
      upperPriorScore
      lowerPriorScore
    }
  }
`;

const TOURNAMENT_FIELDS = gql`
  ${ROUND_FIELDS}
  fragment BracketTournamentFields on Tournament {
    id
    bracketPath
    name
    status
    round {
      number
      secondsRemaining
    }
    rounds {
      ...RoundFields
    }
    winner {
      entity {
        name
      }
    }
    currentUserShouldVote
    currentUserNextTournament {
      id
      name
      bracketPath
    }
  }
`;

export const TOURNAMENT = gql`
  ${TOURNAMENT_FIELDS}
  query Tournament($id: ID!) {
    tournament(id: $id) {
      ...BracketTournamentFields
    }
  }
`;

export const VOTABLE_TOURNAMENTS = gql`
  ${TOURNAMENT_FIELDS}
  query Tournaments {
    tournaments(scopes: ["votable"]) {
      ...BracketTournamentFields
    }
  }
`;

export const SUBMIT_VOTE = gql`
  mutation SubmitVote($input: SubmitVoteInput!) {
    submitVote(input: $input) {
      contest {
        id
      }
    }
  }
`;
