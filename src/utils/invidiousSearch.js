// @flow
import AsyncStorage from '@react-native-community/async-storage';

const invidiousSearch = async (value: string): Promise<void> => {
  const instance = await AsyncStorage.getItem('instance');

  return fetch(`${instance}/api/v1/search?q=${value}&type=video`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      return result;
    });
};

export default invidiousSearch;
