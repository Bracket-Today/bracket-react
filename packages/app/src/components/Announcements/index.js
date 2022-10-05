import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import { Notice } from 'app/src/styles';
import colors from 'app/src/styles/colors';

import { ANNOUNCEMENTS } from './queries';
import Announcement from './show';

const Container = styled(Notice)`
  border-color: ${colors.screen};
`;

const Announcements = () => {
  const { data } = useQuery(ANNOUNCEMENTS);

  if (data && data.announcements.length) {
    return (
      <Container>
        {data.announcements.map(announcement => (
          <Announcement key={announcement.id} announcement={announcement} />
        ))}
      </Container>
    );
  } else {
    return null;
  }
};

export default Announcements;
