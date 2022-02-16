interface fetchGithubRelease {
  tagName: string;
  browserDownloadUrl: string;
}

const API_GITHUB_YAP_RELEASE =
  "https://api.github.com/repos/stephane-r/HoloPlay/releases";

export const fetchGithubRelease = (): Promise<fetchGithubRelease> =>
  fetch(API_GITHUB_YAP_RELEASE)
    .then((request) => request.json())
    .then(([repo]) => ({
      tagName: repo.tag_name,
      browserDownloadUrl: repo.assets[0].browser_download_url,
    }));
