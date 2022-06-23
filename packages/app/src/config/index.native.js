import {
  REACT_APP_API_URI,
  REACT_APP_PTI_TOKEN,
} from '@env';

console.log(REACT_APP_API_URI);

const config = {
  api: {
    uri: REACT_APP_API_URI + '/graphql'
  },
  pti: {
    token: REACT_APP_PTI_TOKEN,
    issueUrl: 'https://preflighttech.com/api/1/issues'
  },
  app: {
    name: 'bracket-native',
    version: 20220622,
  }
};

export default config;
