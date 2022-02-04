import { requestWriteExternalStoragePermission } from "../hooks/useBackup";
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";

const { android } = RNFetchBlob;

const downloadApk = async (url: string, fileName: string): Promise<void> => {
  // actions.setSnackbar({
  //   message: 'Download have started'
  // });

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
      // actions.setSnackbar({
      //   message: `New apk has been download ! Go to your download folder and run apk file`
      // });
      android.actionViewIntent(
        res.path(),
        "application/vnd.android.package-archive"
      );
    });
};

export default downloadApk;
