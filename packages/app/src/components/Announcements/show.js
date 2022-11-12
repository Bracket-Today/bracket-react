import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import MediaQuery from 'react-native-web-responsive';

import { Link } from 'app/src/utils/routing';
import { Text, Subtitle } from 'app/src/styles';
import colors from 'app/src/styles/colors';

const Container = styled(View)`
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SubjectContainer = styled(View)`
  flex-direction: row;
`;

const SubjectContainerSmall = styled(View)`
  flex-direction: column;
`;

const Subject = styled(Subtitle)`
  color: ${colors.screen};
`;

const Details = styled(Text)`
  margin-top: 8px;
  font-size: 14px;
`;

const Announcement = ({ announcement }) => {
  const hasLink = announcement.linkText && announcement.url;

  return (
    <Container>
      <MediaQuery minWidth={800}>
        <SubjectContainer>
          <Subject>{announcement.subject}</Subject>
          {hasLink && (
            <Link to={announcement.url}>
              <Subject> → {announcement.linkText}</Subject>
            </Link>
          )}
        </SubjectContainer>
      </MediaQuery>
      <MediaQuery maxWidth={799}>
        <SubjectContainerSmall>
          <Subject>{announcement.subject}</Subject>
          {hasLink && (
            <Link to={announcement.url}>
              <Subject> → {announcement.linkText}</Subject>
            </Link>
          )}
        </SubjectContainerSmall>
      </MediaQuery>

      {announcement.details && (
        <Details>{announcement.details}</Details>
      )}
    </Container>
  );
};

export default Announcement;
