import callApi from '../../utils/callApi';
import api from '../../config/api';

const playlistState = {
  playlistList: []
};

const playlistActions = {
  createNewPlaylist: async (state, actions, newPlaylist) => {
    const { _id, playlist } = state.user;
    const playlistUpdated = {
      playlist: [...playlist, newPlaylist]
    };
    const user = {
      ...state.user,
      ...playlistUpdated
    };

    // await actions.updateUser(playlistUpdated);

    const headers = { Authorization: `Bearer ${state.jwt}` };
    await callApi(api.update(_id), 'put', playlistUpdated, headers);

    return {
      ...state,
      user
    };
  }
};

export { playlistState, playlistActions };
