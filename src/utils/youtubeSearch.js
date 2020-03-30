// @flow
import config from 'react-native-config';

const { YOUTUBE_API_STREAM_URL } = config;

const YoutubeSearch = (value: string): Promise<void> => {
  return fetch(`${YOUTUBE_API_STREAM_URL}/search?q=${value}`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      return result;
    });
  // return YTSearch(value, options, async (error, results) => {
  //   if (error) reject(error.message);
  //   const sources = await Promise.all(
  //     results.map(async item => {
  //       const sourceDetail = await getYoutubeContentDetail(item.id);

  //       return {
  //         ...item,
  //         ...sourceDetail
  //       };
  //     })
  //   );

  //   resolve(sources);
  // });
};

export default YoutubeSearch;
