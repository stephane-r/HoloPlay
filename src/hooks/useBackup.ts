import RNFS from 'react-native-fs';
import useStore from './useStore';
import { actions } from '../store';
import { PermissionsAndroid, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

const fileName = 'holoplay-backup.json';
const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

const useBackup = () => {
  const store = useStore();
  const { t } = useTranslation();

  const backupData = async (): Promise<any> => {
    await requestWriteExternalStoragePermission();

    if (await RNFS.exists(path)) {
      await RNFS.unlink(path);
    }

    RNFS.writeFile(
      path,
      JSON.stringify({
        playlists: store.playlists,
        favorisPlaylist: store.favorisPlaylist
      }),
      'utf8'
    )
      .then(() =>
        actions.setSnackbar({
          message: t('flashMessage.dataExportSuccess')
        })
      )
      .catch(() => {
        actions.setSnackbar({ message: t('flashMessage.dataExportError') });
      });
  };

  const importData = async (): Promise<any> => {
    await requestWriteExternalStoragePermission();

    RNFS.readDir(RNFS.DownloadDirectoryPath)
      .then(files => {
        const backupFile = files.find(file => file.name === fileName);
        return RNFS.readFile(backupFile.path, 'utf8');
      })
      .then(async data => {
        await actions.importData(JSON.parse(data));
        actions.setSnackbar({
          message: t('flashMessage.dataImportSuccess')
        });
      })
      .catch(() => {
        actions.setSnackbar({
          message: t('flashMessage.dataImportError')
        });
      });
  };

  return {
    backupData,
    importData
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

    return Promise.reject('Reject');
  } catch (error) {
    console.logo(error);
  }
};

export default useBackup;
