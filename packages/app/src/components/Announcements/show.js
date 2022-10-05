import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

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

const Subject = styled(Subtitle)`
  color: ${colors.screen};
`;

const Details = styled(Text)`
  font-size: 14px;
`;

const Announcement = ({ announcement }) => {
  return (
    <Container>
      <SubjectContainer>
        <Subject>{announcement.subject}</Subject>
        {announcement.linkText && announcement.url && (
          <Link to={announcement.url}>
            <Subject> → {announcement.linkText}</Subject>
          </Link>
        )}
      </SubjectContainer>
      {announcement.details && (
        <Details>{announcement.details}</Details>
      )}
    </Container>
  );
};

export default Announcement;
