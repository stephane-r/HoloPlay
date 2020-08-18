import { useEffect, useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { version } from '../../package';
import fetchHopRelease from '../utils/fetchGithubAppVersion';
import { actions } from '../store';
import downloadApk from '../utils/downloadApk';

interface UseUpdateReleaseHook {
  updateAvailable: boolean;
  downloadApk: () => void;
}

const useUpdateRelease = (
  showFlashMessage: boolean = false
): UseUpdateReleaseHook => {
  const [url, setUrl] = useState<null | string>(null);
  const [fileName, setFileName] = useState<null | string>(null);
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  useEffect(() => {
    fetchHopRelease().then(({ tagName, browserDownloadUrl }) => {
      if (tagName > version) {
        setUrl(browserDownloadUrl);
        setFileName(`holoplay-${tagName}.apk`);
        setUpdateAvailable(true);

        if (showFlashMessage) {
          showUpdateIsAvailable();
        }
      }
    });
  });

  const showUpdateIsAvailable = () => {
    setTimeout(
      () =>
        actions.setFlashMessage({
          message: 'A new update is available',
          action: {
            label: 'Download',
            onPress: () => downloadApk(url, fileName)
          }
        }),
      1000
    );
  };

  return {
    updateAvailable,
    downloadApk: () => downloadApk(url, fileName)
  };
};
export default useUpdateRelease;
