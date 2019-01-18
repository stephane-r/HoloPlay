import createStore from 'react-waterfall';
import { searchState, searchActions } from '../reducers/Search';
import { audioState, audioActions } from '../reducers/Audio';
import { apiState, apiActions } from '../reducers/Api';

const config = {
  initialState: {
    ...searchState,
    ...audioState,
    ...apiState
  },
  actionsCreators: {
    ...searchActions,
    ...audioActions,
    ...apiActions
  }
};

export const { Provider, connect, actions } = createStore(config);
