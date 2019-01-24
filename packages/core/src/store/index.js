import createStore from 'react-waterfall';
import { searchState, searchActions } from '../reducers/Search';
import { audioState, audioActions } from '../reducers/Audio';
import { apiState, apiActions } from '../reducers/Api';
import { appState, appActions } from '../reducers/App';

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

export const { Provider, connect, actions } = createStore(config);
