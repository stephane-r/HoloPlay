import RNFetchBlob from 'rn-fetch-blob';
import slugify from './slugify';

export interface DownloadFileParams {
  url: string;
  fileName: string;
}

const downloadFile = async ({
  url,
  fileName
}: DownloadFileParams): Promise<any> =>
  RNFetchBlob.config({
    fileCache: true,
    path: `${RNFetchBlob.fs.dirs.MusicDir}/${slugify(fileName)}.mp4`
  })
    .fetch('GET', url)
    .then((res) => {
      console.log(res.path());
    });

export default downloadFile;
