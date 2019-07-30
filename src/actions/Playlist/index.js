const playlistState = {
  playlistIsFecthing: false
};

const playlistActions = {
  setPlaylistIsFecthing: async state => {
    return {
      ...state,
      playlistIsFecthing: true
    };
  },
  playPlaylist: async (state, actions, playlistId) => {
    const playlist = state.user.playlist.find(item => item.id === playlistId);
    await actions.setPlaylistFrom(playlist);
    await actions.loadSource(0);

    return;
  }
};

export { playlistState, playlistActions };
