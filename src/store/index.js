import createStore from 'react-waterfall';
import { searchState, searchActions } from '../actions/Search';
import { audioState, audioActions } from '../actions/Audio';
import { apiState, apiActions } from '../actions/Api';
import { appState, appActions } from '../actions/App';
import { playlistState, playlistActions } from '../actions/Playlist';

const config = {
  initialState: {
    ...searchState,
    ...audioState,
    ...apiState,
    ...appState,
    ...playlistState
  },
  actionsCreators: {
    ...searchActions,
    ...audioActions,
    ...apiActions,
    ...appActions,
    ...playlistActions
  }
};

export const { Provider, connect, actions } = createStore(config);
