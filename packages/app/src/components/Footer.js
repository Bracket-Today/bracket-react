import React from 'react';
import { View, Linking } from 'react-native';
import styled from 'styled-components/native';

import { HeaderText } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import { Link } from 'app/src/utils/routing';
import ExternalLink from 'app/src/elements/ExternalLink';

const PRIVACY_URL = 'https://www.privacypolicygenerator.info/live.php?token=RFRQTCpSZk7dPvWxlNKoYHpPqbbQ5ook';

const Container = styled(View)`
  background-color: ${colors.screen};
  height: 90px;
  padding: 20px;
  padding-left: 40px;
`;

const FooterText = styled(HeaderText)`
  color: white;
  font-size: 16px;
  margin-bottom: 6px;
`;

const Footer = () => {
  return (
    <Container>
      <ExternalLink url={PRIVACY_URL}>
        <FooterText>Privacy Policy</FooterText>
      </ExternalLink>
      <Link to="/ticket">
        <FooterText>Report Bug/Request Feature</FooterText>
      </Link>
    </Container>
  );
};

export default Footer;
