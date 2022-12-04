import { gql } from '@apollo/client';
import { COMPETITOR_FIELDS } from 'app/src/components/Competitors/queries';

export const CONTEST_FIELDS = gql`
  ${COMPETITOR_FIELDS}
  fragment ContestFields on Contest {
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
`;

export const ROUND_FIELDS = gql`
  ${CONTEST_FIELDS}
  fragment RoundFields on Round {
    number
    multiplier
    contests {
      ...ContestFields
    }
  }
`;

const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    id
    user {
      username
    }
    body
    createdAt
  }
`;

const TOURNAMENT_FIELDS = gql`
  ${ROUND_FIELDS}
  ${COMMENT_FIELDS}
  fragment BracketTournamentFields on Tournament {
    id
    bracketPath
    name
    notes
    status
    owner {
      username
    }
    basedOn {
      name
      bracketPath
    }
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
    viewComments
    makeComments
    comments(scopes: ["root"]) {
      ...CommentFields
      children {
        ...CommentFields
      }
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

export const CLEAR_VOTE = gql`
  mutation Vote($input: ClearVoteInput!) {
    clearVote(input: $input) {
      contest {
        id
      }
    }
  }
`;
