import { useEffect, useState } from "react";
import config from "react-native-config";
import semverCompare from "semver-compare";

import { version } from "../../package";
import { useSnackbar } from "../providers/Snackbar";
import downloadApk from "../utils/downloadApk";
import fetchHopRelease from "../utils/fetchGithubAppVersion";

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
  const snackbar = useSnackbar();

  useEffect(() => {
    if (
      config.GITHUB_RELEASE === "true" ||
      process.env.NODE_ENV === "development"
    ) {
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

  const handleDownloadFile = async () => {
    snackbar.show("Download have started");
    downloadApk(url, fileName, () => {
      snackbar.show(
        "New apk has been download ! Go to your download folder and run apk file"
      );
    });
  };

  const showUpdateIsAvailable = () => {
    setTimeout(
      () =>
        snackbar.show("A new update is available", {
          action: {
            label: "Download",
            onPress: handleDownloadFile,
          },
        }),
      1000
    );
  };

  return {
    updateAvailable,
    downloadApk: handleDownloadFile,
  };
};
export default useUpdateRelease;
