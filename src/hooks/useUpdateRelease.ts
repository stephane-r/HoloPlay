import { useEffect, useState } from 'react';
import { version } from '../../package';
import fetchHopRelease from '../utils/fetchGithubAppVersion';
import useLinking from './useLinking';
import { actions } from '../store';

interface UseUpdateReleaseHook {
  updateAvailable: boolean;
  openUrl: () => void;
}

const useUpdateRelease = (
  showFlashMessage: boolean = false
): UseUpdateReleaseHook => {
  const { openUrl } = useLinking();
  const [url, setUrl] = useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    fetchHopRelease().then(({ tagName, browserDownloadUrl }) => {
      if (tagName > version) {
        setUrl(browserDownloadUrl);
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
            onPress: () => openUrl(url)
          }
        }),
      1000
    );
  };

  return {
    updateAvailable,
    openUrl: () => openUrl(url)
  };
};

export default useUpdateRelease;
