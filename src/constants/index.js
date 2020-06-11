export const ApiRoutes = {
  Preferences: 'auth/preferences',
  Playlists: 'auth/playlists',
  Videos: playlistId => `auth/playlists/${playlistId}/videos`,
  VideoIndexId: (playlistId, indexId) =>
    `auth/playlists/${playlistId}/videos/${indexId}`
};

export const FAVORIS_PLAYLIST_TITLE = 'favoris';
