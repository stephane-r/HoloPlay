import createStore from 'react-waterfall';
import searchActions from '../actions/Search';
import searchState from '../states/Search';
import audioActions from '../actions/Audio';
import audioState from '../states/Audio';

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
