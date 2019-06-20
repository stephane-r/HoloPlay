// @flow
import config from 'react-native-config';
import YTSearch from 'youtube-search';

const { YOUTUBE_API_KEY } = config;

const options: Object = {
  maxResults: 10,
  key: YOUTUBE_API_KEY
};

const YoutubeSearch = (value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    return YTSearch(value, options, (error, results) => {
      if (error) reject(error.message);
      resolve(results);
    });
  });
};

export default YoutubeSearch;
