import { gql } from '@apollo/client';

export const ENTITY_CORE_FIELDS = gql`
  fragment EntityCoreFields on Entity {
    id
    name
    fullPath
    annotation
    competitors: searchableCompetitors {
      id
      annotation
      tournament {
        name
        bracketPath
        statusDetail
        startAt
      }
    }
  }
`;

export const ENTITY = gql`
  ${ENTITY_CORE_FIELDS}
  query Entity($id: ID!) {
    entity(id: $id) {
      ...EntityCoreFields
    }
  }
`;
