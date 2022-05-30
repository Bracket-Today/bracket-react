import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from 'app/src/config/storage';

const storage = new Storage({
  ...config,
  storageBackend: AsyncStorage,
});

export default storage;
