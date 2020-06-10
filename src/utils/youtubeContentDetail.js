// @flow
import AsyncStorage from '@react-native-community/async-storage';

const getYoutubeContentDetail = async (videoId: string): Object => {
  try {
    const instance = await AsyncStorage.getItem('instance');
    const request = await fetch(`${instance}/api/v1/videos/${videoId}`);
    const response = await request.json();

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getYoutubeContentDetail;
