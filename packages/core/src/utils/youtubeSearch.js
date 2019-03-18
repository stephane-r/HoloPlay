// @flow
import YTSearch from 'youtube-search';

const options: Object = {
  maxResults: 10,
  key: process.env.YOUTUBE_API_KEY
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
