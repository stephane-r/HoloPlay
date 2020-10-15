export const ApiRoutes = {
  VideoId: (videoId: string) => `videos/${videoId}`,
  Preferences: 'auth/preferences',
  Playlists: 'auth/playlists',
  PlaylistId: (playlistId: string) => `playlists/${playlistId}`,
  Videos: (playlistId: string) => `playlists/${playlistId}/videos`,
  VideoIndexId: (playlistId: string, indexId: string) =>
    `playlists/${playlistId}/videos/${indexId}`
};

export const FAVORIS_PLAYLIST_TITLE: string = 'favoris';
