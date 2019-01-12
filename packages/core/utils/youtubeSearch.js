import YTSearch from 'youtube-search';
import { YOUTUBE_KEY } from '../config/env';

const options = {
  maxResults: 10,
  key: YOUTUBE_KEY
};

const YoutubeSearch = value => {
  return new Promise((resolve, reject) => {
    return YTSearch(value, options, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export default YoutubeSearch;
