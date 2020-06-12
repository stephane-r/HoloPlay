export const ApiRoutes = {
  VideoId: (videoId: string) => `videos/${videoId}`,
  Preferences: 'auth/preferences',
  Playlists: 'auth/playlists',
  PlaylistId: (playlistId: string) => `auth/playlists/${playlistId}`,
  Videos: (playlistId: string) => `auth/playlists/${playlistId}/videos`,
  VideoIndexId: (playlistId: string, indexId: string) =>
    `auth/playlists/${playlistId}/videos/${indexId}`
};

export const FAVORIS_PLAYLIST_TITLE: string = 'favoris';

export const PUBLIC_INVIDIOUS_INSTANCES = [
  {
    value: 'https://invidio.us',
    label: 'invidio.us (Official Instance)'
  },
  {
    value: 'https://invidious.snopyta.org',
    label: 'invidious.snopyta.org'
  },
  {
    value: 'https://yewtu.be',
    label: 'yewtu.be'
  },
  {
    value: 'https://invidious.ggc-project.de',
    label: 'invidious.ggc-project.de'
  },
  {
    value: 'https://yt.maisputain.ovh',
    label: 'yt.maisputain.ovh'
  },
  {
    value: 'https://invidious.13ad.de',
    label: 'invidious.13ad.de'
  },
  {
    value: 'https://invidious.fdn.fr',
    label: 'invidious.fdn.fr'
  },
  {
    value: 'https://watch.nettohikari.com',
    label: 'watch.nettohikari.com'
  },
  {
    value: 'other',
    label: 'Other'
  }
];
