import { gql } from '@apollo/client';

export const COMPETITOR_FIELDS = gql`
  fragment CompetitorFields on Competitor {
    id
    seed
    annotation
    entity {
      id
      name
      annotation
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
