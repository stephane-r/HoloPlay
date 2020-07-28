import RNFS from 'react-native-fs';
import useStore from './useStore';
import { actions } from '../store';

const useBackup = () => {
  const store = useStore();

  const backupData = (fileName?: string = 'backup.json'): Promise<any> => {
    const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    RNFS.writeFile(
      path,
      JSON.stringify({
        playlists: store.playlists,
        favorisPlaylist: store.favorisPlaylist
      }),
      'utf8'
    )
      .then((success) => actions.setFlashMessage('Your data are exported.'))
      .catch(() =>
        actions.setFlashMessage('Error : your data can not be exported.')
      );
  };

  const importData = (): Promise<any> => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        const backupFile = result.find((file) => file.name === 'backup.json');
        console.log(backupFile);
        return RNFS.readFile(backupFile.path, 'utf8');
      })
      .then((success) => actions.setFlashMessage('Your data are imported.'))
      .catch(() =>
        actions.setFlashMessage('Error : your data can not be imported.')
      );
  };

  return {
    backupData,
    importData
  };
};

export default useBackup;
