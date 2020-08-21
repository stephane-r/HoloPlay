import createStore from 'react-waterfall';
import { searchState, searchActions, SearchState } from './Search';
import { playerState, playerActions, PlayerState } from './Player';
import { dataState, dataActions, DataState } from './Data';
import { appState, appActions, AppState } from './App';

export interface Store extends AppState, DataState, PlayerState, SearchState {}

interface ConfigStore {
  initialState: Store;
  actionsCreators: {
    [key: string]: any;
  };
}

const config: ConfigStore = {
  initialState: {
    ...searchState,
    ...playerState,
    ...dataState,
    ...appState
  },
  actionsCreators: {
    ...searchActions,
    ...playerActions,
    ...dataActions,
    ...appActions
  }
};

export const { Provider, connect, actions, getState } = createStore(config);
