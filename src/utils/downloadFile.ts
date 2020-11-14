import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import slugify from './slugify';
import { requestWriteExternalStoragePermission } from '../hooks/useBackup';
import { actions } from '../store';

export interface DownloadFileParams {
  url: string;
  fileName: string;
  dir?: string;
}

const downloadFile = async ({
  url,
  fileName,
  dir = RNFetchBlob.fs.dirs.MusicDir
}: DownloadFileParams): Promise<any> => {
  await requestWriteExternalStoragePermission();

  return RNFetchBlob.config({
    addAndroidDownloads: {
      useDownloadManager: true,
      title: fileName,
      path: `${dir}/${slugify(fileName)}.mp4`,
      mime: 'video/mp4',
      notification: true
    }
  })
    .fetch('GET', url)
    .then((res) => {
      actions.setFlashMessage({
        message: `File has been download in your Music folder`
      });
    });
};

export default downloadFile;
