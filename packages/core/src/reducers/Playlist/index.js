const playlistState = {
  playlistList: []
};

const playlistActions = {
  createNewPlaylist: async (state, actions, newPlaylist) => {
    const { playlist } = state.user;
    const playlistUpdated = {
      playlist: playlist ? [...playlist, newPlaylist] : [newPlaylist]
    };
    const user = {
      ...state.user,
      ...playlistUpdated
    };

    await actions.updateUser(playlistUpdated);

    return {
      ...state,
      user
    };
  }
};

export { playlistState, playlistActions };
