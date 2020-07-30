import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import slugify from './slugify';
import { requestWriteExternalStoragePermission } from '../hooks/useBackup';

export interface DownloadFileParams {
  url: string;
  fileName: string;
}

const downloadFile = async ({
  url,
  fileName
}: DownloadFileParams): Promise<any> => {
  await requestWriteExternalStoragePermission();

  return RNFetchBlob.config({
    fileCache: true,
    path: `${RNFS.DownloadDirectoryPath}/${slugify(fileName)}.mp4`
  })
    .fetch('GET', url)
    .then((res) => {
      console.log('**********************');
      console.log(res.path());
      console.log('**********************');
    })
    .catch(console.log);
};

export default downloadFile;
