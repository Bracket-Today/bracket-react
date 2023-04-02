import { gql } from '@apollo/client';

import { TOURNAMENT_CORE_FIELDS } from 'app/src/components/Tournaments/queries';
import { ENTITY_CORE_FIELDS } from 'app/src/components/Entities/queries';

export const SEARCH = gql`
  ${TOURNAMENT_CORE_FIELDS}
  ${ENTITY_CORE_FIELDS}
  query Search($term: String!) {
    search(term: $term) {
      ... on Tournament {
        ...TournamentCoreFields
      }
      ... on Entity {
        ...EntityCoreFields
        searchableCompetitorsCount
      }
    }
  }
`;
