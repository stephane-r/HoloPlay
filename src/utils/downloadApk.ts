import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";

import { requestWriteExternalStoragePermission } from "../hooks/useBackup";

const { android } = RNFetchBlob;

const downloadApk = async (
  url: string,
  fileName: string,
  callback: () => void
): Promise<void> => {
  await requestWriteExternalStoragePermission();

  return RNFetchBlob.config({
    addAndroidDownloads: {
      useDownloadManager: true,
      title: fileName,
      path: `${RNFS.DownloadDirectoryPath}/hop-release.apk`,
      mime: "application/vnd.android.package-archive",
      mediaScannable: true,
      notification: true,
    },
  })
    .fetch("GET", url)
    .then((res) => {
      callback();
      android.actionViewIntent(
        res.path(),
        "application/vnd.android.package-archive"
      );
    });
};

export default downloadApk;
