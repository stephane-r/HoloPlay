import { YOUTUBE_API_KEY } from '../config/env';

const baseURL = 'https://www.googleapis.com/youtube/v3/videos';

const getYoutubeContentDetail = async id => {
  try {
    const request = await fetch(
      `${baseURL}?part=contentDetails&id=${id}&key=${YOUTUBE_API_KEY}`
    );
    const response = request.json();

    return response;
  } catch (error) {
    return error;
  }
};

export default getYoutubeContentDetail;
