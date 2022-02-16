import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import config from "react-native-config";
import semverCompare from "semver-compare";

import { version } from "../../package";
import { useSnackbar } from "../providers/Snackbar";
import downloadApk from "../utils/downloadApk";
import { fetchGithubRelease } from "../utils/fetchGithubAppVersion";

interface UseUpdateReleaseHook {
  updateAvailable: boolean;
  downloadApk: () => void;
}

const useUpdateRelease = (
  showSnackbar: boolean = false
): UseUpdateReleaseHook => {
  const { t } = useTranslation();
  const [url, setUrl] = useState<null | string>(null);
  const [fileName, setFileName] = useState<null | string>(null);
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const snackbar = useSnackbar();

  useEffect(() => {
    if (
      config.GITHUB_RELEASE === "true" ||
      process.env.NODE_ENV === "development"
    ) {
      fetchGithubRelease().then(({ tagName, browserDownloadUrl }) => {
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
  }, []);

  const handleDownloadFile = useCallback(async () => {
    snackbar.show(t("snackbar.downloadApkStart"));
    return downloadApk(url as string, fileName as string, () => {
      snackbar.show(t("snackbar.downloadApkEnd"));
    });
  }, [snackbar, url, fileName]);

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
