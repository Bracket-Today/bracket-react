import { gql } from '@apollo/client';

export const ANNOUNCEMENTS = gql`
  query Announcements {
    announcements {
      id
      subject
      details
      linkText
      url
    }
  }
`;
