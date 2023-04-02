import { gql } from '@apollo/client';

import { ENTITY_CORE_FIELDS } from 'app/src/components/Entities/queries';

export const COMPETITOR_FIELDS = gql`
  ${ENTITY_CORE_FIELDS}
  fragment CompetitorFields on Competitor {
    id
    seed
    annotation
    entity {
      ...EntityCoreFields
      externalLinks {
        id
        url
      }
    }
  }
`;

export const UPDATE_COMPETITOR = gql`
  ${COMPETITOR_FIELDS}
  mutation UpdateCompetitor($input: UpdateCompetitorInput!) {
    updateCompetitor(input: $input) {
      competitor {
        ...CompetitorFields
      }
    }
  }
`;
