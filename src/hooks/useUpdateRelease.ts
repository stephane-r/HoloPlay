import config from 'react-native-config';
import { useEffect, useState } from 'react';
import semverCompare from 'semver-compare';
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
  showSnackbar: boolean = false
): UseUpdateReleaseHook => {
  const [url, setUrl] = useState<null | string>(null);
  const [fileName, setFileName] = useState<null | string>(null);
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (config.GITHUB_RELEASE === 'true') {
      fetchHopRelease().then(({ tagName, browserDownloadUrl }) => {
        if (semverCompare(tagName, version) === 1) {
          setUrl(browserDownloadUrl);
          setFileName(`holoplay-${tagName}.apk`);
          setUpdateAvailable(true);

          if (showSnackbar) {
            showUpdateIsAvailable();
          }
        }
      });
    }
  });

  const showUpdateIsAvailable = () => {
    setTimeout(
      () =>
        actions.setSnackbar({
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
