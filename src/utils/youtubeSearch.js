// @flow
import config from 'react-native-config';
import YTSearch from 'youtube-search';
import getYoutubeContentDetail from './youtubeContentDetail';

const { YOUTUBE_API_KEY } = config;

const options: Object = {
  maxResults: 20,
  key: YOUTUBE_API_KEY
};

const YoutubeSearch = (value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    return YTSearch(value, options, async (error, results) => {
      if (error) reject(error.message);
      const sources = await Promise.all(
        results.map(async item => {
          const sourceDetail = await getYoutubeContentDetail(item.id);

          return {
            ...item,
            ...sourceDetail
          };
        })
      );

      resolve(sources);
    });
  });
};

export default YoutubeSearch;
