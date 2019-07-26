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
  // addSourceToPlaylist: async (state, actions, { source, playlistId }) => {
  //   const currentPlaylist = state.user.playlist;
  //   const playlistUpdated = {
  //     playlist: currentPlaylist.map(item => {
  //       if (item.id === playlistId) {
  //         const playlist = {
  //           sources: [...item.sources, source]
  //         };

  //         return {
  //           ...item,
  //           ...playlist
  //         };
  //       }

  //       return item;
  //     })
  //   };
  //   const user = {
  //     ...state.user,
  //     ...playlistUpdated
  //   };

  //   await actions.updateUser(playlistUpdated);

  //   return {
  //     ...state,
  //     user
  //   };
  // },
  removeSourceFromPlaylist: async (state, actions, { source, playlistId }) => {
    const currentPlaylist = state.user.playlist;
    const playlistUpdated = {
      playlist: currentPlaylist.map(item => {
        if (item.id === playlistId) {
          const playlist = {
            sources: item.sources.filter(i => i.id !== source.id)
          };

          return {
            ...item,
            ...playlist
          };
        }

        return item;
      })
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
  },
  playPlaylist: async (state, actions, playlistId) => {
    const playlist = state.user.playlist.find(item => item.id === playlistId);
    await actions.setPlaylistFrom(playlist);
    await actions.loadSource(0);

    return;
  }
};

export { playlistState, playlistActions };
