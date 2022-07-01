import { gql } from '@apollo/client';

import { ROUND_FIELDS } from 'app/src/components/Bracket/queries';

export const TOURNAMENTS = gql`
  ${ROUND_FIELDS}
  query Tournaments(
    $scopes: [String!]
  ) {
    tournaments(
      scopes: $scopes
    ) {
      id
      name
      status
      round {
        ...RoundFields
      }
      votersCount
      votesCount
      contestsCount
      currentUserVotedWinnerCount
    }
  }
`;
