// TODO: Rename to data
const apiState = {
  playlists: [],
  favorisPlaylist: null
};

const apiActions = {
  receivePlaylists: (state, actions, playlists) => ({
    ...state,
    playlists
  }),
  addPlaylist: (state, actions, playlist) => ({
    ...state,
    playlists: [playlist, ...state]
  }),
  updatePlaylist: (state, actions, playlist) => ({
    ...state,
    playlists: state.playlists.map(p => {
      if (p.playlistId === playlist.playlistId) {
        return {
          ...p,
          ...playlist
        };
      }

      return playlist;
    })
  }),
  removePlaylist: (state, actions, playlistId) => ({
    ...state,
    playlists: state.playlists.filter(p => p.playlistId !== playlistId)
  }),
  receiveFavorisPlaylist: (state, actions, favorisPlaylist) => ({
    ...state,
    favorisPlaylist
  }),
  addToPlaylist: (state, actions, { playlistId, video }) => {
    const playlists = state.playlists.map(p => {
      if (p.playlistId === playlistId) {
        console.log({
          ...p,
          videos: [video, ...p.videos]
        });
        return {
          ...p,
          videos: [video, ...p.videos]
        };
      }

      return p;
    });

    return {
      ...state,
      playlists
    };
  },
  removeFromPlaylist: (state, actions, { playlistId, indexId }) => {
    const playlists = state.playlists.map(p => {
      if (p.playlistId === playlistId) {
        return {
          ...p,
          videos: p.videos.filter(v => v.indexId !== indexId)
        };
      }

      return p;
    });

    return {
      ...state,
      playlists
    };
  },
  addToFavoris: (state, actions, video) => ({
    ...state,
    favorisPlaylist: {
      ...state.favorisPlaylist,
      videos: [video, ...state.favorisPlaylist.videos]
    }
  }),
  removeFromFavoris: (state, actions, videoId) => ({
    ...state,
    favorisPlaylist: {
      ...state.favorisPlaylist,
      videos: state.favorisPlaylist.videos.filter(v => v.videoId !== videoId)
    }
  }),
  callApi: async (state, actions, { url, body }) => {
    const params = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${state.token}`,
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      params.body = body;
    }

    console.log(params);

    const request = await fetch(`${state.instance}/api/v1/${url}`, params);
    const result = await request.json();

    return result;
  }
};

export { apiState, apiActions };
