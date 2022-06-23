const config = {
  api: {
    uri: process.env.REACT_APP_API_URI + '/graphql'
  },
  pti: {
    token: process.env.REACT_APP_PTI_TOKEN,
    issueUrl: 'https://preflighttech.com/api/1/issues'
  },
  app: {
    name: 'bracket-react',
    version: 20220622,
  }
};

export default config;
