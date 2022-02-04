import { requestWriteExternalStoragePermission } from "../hooks/useBackup";
import slugify from "./slugify";
import RNFetchBlob from "rn-fetch-blob";

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
      mime: "video/mp4",
      notification: true,
    },
  }).fetch("GET", url);
};

export default downloadFile;
