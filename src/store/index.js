import createStore from 'react-waterfall';
import { searchState, searchActions } from '../actions/Search';
import { audioState, audioActions } from '../actions/Audio';
import { apiState, apiActions } from '../actions/Api';
import { appState, appActions } from '../actions/App';

const config = {
  initialState: {
    ...searchState,
    ...audioState,
    ...apiState,
    ...appState
  },
  actionsCreators: {
    ...searchActions,
    ...audioActions,
    ...apiActions,
    ...appActions
  }
};

export const { Provider, connect, actions, getState } = createStore(config);
