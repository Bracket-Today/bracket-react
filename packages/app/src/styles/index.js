import { Text as BaseText } from 'react-native';
import styled from 'styled-components/native';

import fonts from './fonts';

export const HeaderText = styled(BaseText)`
  font-family: '${fonts.header}';
`;

export const Text = styled(BaseText)`
  font-family: '${fonts.body}';
  font-size: 16px;
`;
