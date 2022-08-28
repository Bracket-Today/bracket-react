import { Text as BaseText, View } from 'react-native';
import styled from 'styled-components/native';

import colors from './colors';
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

export const Subtitle = styled(HeaderText)`
  font-size: 16px;
  font-weight: 600;
  color: green;
`;

export const Notice = styled(View)`
  margin-top: 4px;
  margin-bottom: 4px;
  border-style: solid;
  border-color: ${colors.button};
  border-width: 2px;
  padding: 10px;
`;

export const Warning = styled(Notice)`
  border-color: red;
`;

export const WarningText = styled(Text)`
  font-weight: 800;
`;

export const Hint = styled(Text)`
  color: ${colors.disabled};
`;
