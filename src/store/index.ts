// @ts-ignore
import createStore from 'react-waterfall';
import { searchState, searchActions, SearchState } from '../actions/Search';
import { audioState, audioActions, AudioState } from '../actions/Audio';
import { dataState, dataActions, DataState } from '../actions/Data';
import { appState, appActions, AppState } from '../actions/App';

export interface Store extends AppState, DataState, AudioState, SearchState {}

interface ConfigStore {
  initialState: Store;
  actionsCreators: {
    [key: string]: any;
  };
}

const config: ConfigStore = {
  initialState: {
    ...searchState,
    ...audioState,
    ...dataState,
    ...appState
  },
  actionsCreators: {
    ...searchActions,
    ...audioActions,
    ...dataActions,
    ...appActions
  }
};

export const { Provider, connect, actions, getState } = createStore(config);
