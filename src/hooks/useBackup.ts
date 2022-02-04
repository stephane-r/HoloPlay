import { useFavorite } from "../providers/Favorite";
import { usePlaylist } from "../providers/Playlist";
import { useSnackbar } from "../providers/Snackbar";
import { useTranslation } from "react-i18next";
import { PermissionsAndroid } from "react-native";
import RNFS from "react-native-fs";

const fileName = "holoplay-backup.json";
const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

const useBackup = () => {
  const { state: favoriteState } = useFavorite();
  const { state: playlistState } = usePlaylist();
  const { t } = useTranslation();
  const snackbar = useSnackbar();

  const backupData = async (): Promise<any> => {
    await requestWriteExternalStoragePermission();

    if (await RNFS.exists(path)) {
      await RNFS.unlink(path);
    }

    RNFS.writeFile(
      path,
      JSON.stringify({
        playlists: playlistState.playlists,
        favorisPlaylist: favoriteState.favorisPlaylist,
      }),
      "utf8"
    )
      .then(() => snackbar.show(t("snackbar.dataExportSuccess")))
      .catch(() => {
        snackbar.show(t("snackbar.dataExportError"));
      });
  };

  const importData = async (): Promise<any> => {
    await requestWriteExternalStoragePermission();

    RNFS.readDir(RNFS.DownloadDirectoryPath)
      .then((files) => {
        const backupFile = files.find((file) => file.name === fileName);
        return RNFS.readFile(backupFile.path, "utf8");
      })
      .then(async (data) => {
        // await actions.importData(JSON.parse(data));
        snackbar.show(t("snackbar.dataImportSuccess"));
      })
      .catch(() => {
        snackbar.show(t("snackbar.dataImportError"));
      });
  };

  return {
    backupData,
    importData,
  };
};

export const requestWriteExternalStoragePermission = async () => {
  try {
    const test = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    if (test === PermissionsAndroid.RESULTS.GRANTED) {
      return Promise.resolve(PermissionsAndroid.RESULTS.GRANTED);
    }

    return Promise.reject("Reject");
  } catch (error) {
    console.logo(error);
  }
};

export default useBackup;
