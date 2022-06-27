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
    }
  }
`;

export const TOURNAMENT = gql`
  ${ROUND_FIELDS}
  query Tournament($id: ID!) {
    tournament(id: $id) {
      id
      name
      rounds {
        ...RoundFields
      }
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
