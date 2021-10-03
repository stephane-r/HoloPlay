import createStore from 'react-waterfall';
import { searchState, searchActions, SearchState } from './Search';
import { playerState, playerActions, PlayerState } from './Player';
import { dataState, dataActions, DataState } from './Data';
import { appState, appActions, AppState } from './App';
import { snackbarState, snackbarActions, SnackbarState } from './Snackbar';

export interface Store
  extends AppState,
    DataState,
    PlayerState,
    SearchState,
    SnackbarState {}

interface ConfigStore {
  initialState: Store;
  actionsCreators: {
    [key: string]: any;
  };
}

const config: ConfigStore = {
  initialState: {
    ...snackbarState,
    ...searchState,
    ...playerState,
    ...dataState,
    ...appState
  },
  actionsCreators: {
    ...snackbarActions,
    ...searchActions,
    ...playerActions,
    ...dataActions,
    ...appActions
  }
};

export const { Provider, connect, actions, getState } = createStore(config);
