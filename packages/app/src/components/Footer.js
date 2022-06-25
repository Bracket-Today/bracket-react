import React from 'react';
import { View, Linking } from 'react-native';
import styled from 'styled-components/native';

import { HeaderText } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import { Link } from 'app/src/utils/routing';

const PRIVACY_URL = 'https://www.privacypolicygenerator.info/live.php?token=RFRQTCpSZk7dPvWxlNKoYHpPqbbQ5ook';

const Container = styled(View)`
  background-color: ${colors.screen};
  height: 120px;
`;

const FooterText = styled(HeaderText)`
  color: white;
  font-size: 18px;
  padding: 20px;
  padding-left: 40px;
`;

const Footer = () => {
  const openPrivacy = () => {
    Linking.canOpenURL(PRIVACY_URL).then(() => {
      return Linking.openURL(PRIVACY_URL);
    });
  };

  return (
    <Container>
      <FooterText onPress={openPrivacy}>Privacy Policy</FooterText>
    </Container>
  );
};

export default Footer;