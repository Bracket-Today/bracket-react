const storageConfig = {
  defaultExpires: null, // never
  enableCache: true,
  sync: {
    auth: () => ({ uuid: null }),
  },
};

export default storageConfig;
