import createStore from 'react-waterfall';
import { searchState, searchActions } from '../reducers/Search';
import { audioState, audioActions } from '../reducers/Audio';

const config = {
  initialState: {
    ...searchState,
    ...audioState
  },
  actionsCreators: {
    ...searchActions,
    ...audioActions
  }
};

export const { Provider, connect, actions } = createStore(config);
