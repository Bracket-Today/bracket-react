import { Text as BaseText, View } from 'react-native';
import styled from 'styled-components/native';

import fonts from './fonts';

export const HeaderText = styled(BaseText)`
  font-family: '${fonts.header}';
`;

export const Text = styled(BaseText)`
  font-family: '${fonts.body}';
  font-size: 16px;
`;

export const Header = styled(View)`
  margin-bottom: 20px;
`;

export const Title = styled(HeaderText)`
  font-size: 22px;
  font-weight: 800;
`;
