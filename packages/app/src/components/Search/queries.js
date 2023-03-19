import { gql } from '@apollo/client';

import { TOURNAMENT_CORE_FIELDS } from 'app/src/components/Tournaments/queries';

export const SEARCH = gql`
  ${TOURNAMENT_CORE_FIELDS}
  query Search($term: String!) {
    search(term: $term) {
      ...TournamentCoreFields
    }
  }
`;
