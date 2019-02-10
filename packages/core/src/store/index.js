import createStore from 'react-waterfall';
import { searchState, searchActions } from '../reducers/Search';
import { audioState, audioActions } from '../reducers/Audio';
import { apiState, apiActions } from '../reducers/Api';
import { appState, appActions } from '../reducers/App';
import { playlistState, playlistActions } from '../reducers/Playlist';

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
