import RNFS from 'react-native-fs';
import useStore from './useStore';
import { actions } from '../store';
import { PermissionsAndroid, Alert } from 'react-native';

const fileName = 'holoplay-backup.json';
const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

const useBackup = () => {
  const store = useStore();

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
        actions.setFlashMessage({ message: 'Your data are exported' })
      )
      .catch((error) => {
        console.log(error);
        actions.setFlashMessage({
          message: 'Error : your data can not be exported.'
        });
      });
  };

  const importData = async (): Promise<any> => {
    await requestWriteExternalStoragePermission();

    RNFS.readDir(RNFS.DownloadDirectoryPath)
      .then((files) => {
        const backupFile = files.find((file) => file.name === fileName);
        return RNFS.readFile(backupFile.path, 'utf8');
      })
      .then(async (data) => {
        await actions.importData(JSON.parse(data));
        actions.setFlashMessage({ message: 'Your data are imported.' });
      })
      .catch((error) => {
        console.log(error);
        actions.setFlashMessage({
          message: 'Error : your data can not be imported.'
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
