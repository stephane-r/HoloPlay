// @flow
import config from 'react-native-config';

const { YOUTUBE_API_STREAM_URL } = config;

const getYoutubeContentDetail = async (id: string): Object => {
  try {
    const request = await fetch(`${YOUTUBE_API_STREAM_URL}/videos/${id}`);
    const response = await request.json();

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getYoutubeContentDetail;
