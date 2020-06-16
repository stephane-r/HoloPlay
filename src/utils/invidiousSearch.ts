import AsyncStorage from '@react-native-community/async-storage';
import { SearchVideo } from '../types';

const invidiousSearch = async (value: string): Promise<SearchVideo[]> => {
  const instance = await AsyncStorage.getItem('instance');

  return fetch(`${instance}/api/v1/search?q=${value}&type=video`)
    .then(response => response.json())
    .then(result => result);
};

export default invidiousSearch;
