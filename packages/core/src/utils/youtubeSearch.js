// @flow
import YTSearch from 'youtube-search';
import { YOUTUBE_API_KEY } from '../config/env';

const options: Object = {
  maxResults: 10,
  key: YOUTUBE_API_KEY
};

const YoutubeSearch = (value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    return YTSearch(value, options, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export default YoutubeSearch;
