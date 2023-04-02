import { gql } from '@apollo/client';

export const ENTITY_CORE_FIELDS = gql`
  fragment EntityCoreFields on Entity {
    id
    name
    fullPath
    annotation
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
