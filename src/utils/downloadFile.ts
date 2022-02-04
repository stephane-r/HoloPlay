import RNFetchBlob from 'rn-fetch-blob';
import slugify from './slugify';
import { requestWriteExternalStoragePermission } from '../hooks/useBackup';

export interface DownloadFileParams {
  url: string;
  fileName: string;
  dir?: string;
}

const downloadFile = async ({
  url,
  fileName,
  dir = RNFetchBlob.fs.dirs.MusicDir,
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
  }).fetch('GET', url);
};

export default downloadFile;
