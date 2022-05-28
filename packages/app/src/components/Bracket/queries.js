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

export const TOURNAMENT = gql`
  ${COMPETITOR_FIELDS}
  query Tournament($id: ID!) {
    tournament(id: $id) {
      id
      name
      rounds {
        number
        multiplier
        contests {
          id
          round
          sort
          upper {
            ...CompetitorFields
          }
          lower {
            ...CompetitorFields
          }
          winner {
            ...CompetitorFields
          }
        }
      }
    }
  }
`;
