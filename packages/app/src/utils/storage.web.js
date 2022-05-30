import Storage from 'react-native-storage';
import config from 'app/src/config/storage';

const storage = new Storage({
  ...config,
  storageBackend: window.localStorage,
});

export default storage;
