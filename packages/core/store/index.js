import createStore from 'react-waterfall';
import searchActions from '../actions/Search';
import searchState from '../states/Search';

const config = {
  initialState: {
    ...searchState
  },
  actionsCreators: {
    ...searchActions
  }
};

export const { Provider, connect, actions } = createStore(config);
