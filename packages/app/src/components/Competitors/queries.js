import { gql } from '@apollo/client';

const COMPETITOR_FIELDS = gql`
  fragment CompetitorFields on Competitor {
    id
    entity {
      id
      name
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
