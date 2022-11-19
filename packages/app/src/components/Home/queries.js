import { gql } from '@apollo/client';

import { CONTEST_FIELDS } from 'app/src/components/Bracket/queries';

export const TOURNAMENTS = gql`
  ${CONTEST_FIELDS}
  query Tournaments(
    $scopes: [String!]
  ) {
    tournaments(
      scopes: $scopes
    ) {
      id
      bracketPath
      name
      status
      currentRoundByTime
      summaryContests {
        ...ContestFields
      }
      votersCount
      votesCount
      contestsCount
      currentUserVotedWinnerCount
      featured
    }
    upcoming: tournaments(
      scopes: ["upcoming", "visible"]
    ) {
      id
      name
      startAt
    }
  }
`;
