import createStore from 'react-waterfall';
import { searchState, searchActions, SearchState } from './Search';
import { playerState, playerActions, PlayerState } from './Player';
import { dataState, dataActions, DataState } from './Data';
import { appState, appActions, AppState } from './App';
import { snackbarState, snackbarActions, SnackbarState } from './Snackbar';
import { dialogActions, dialogState, DialogState } from './Dialog';

export interface Store
  extends AppState,
    DataState,
    PlayerState,
    SearchState,
    SnackbarState,
    DialogState {}

interface ConfigStore {
  initialState: Store;
  actionsCreators: {
    [key: string]: any;
  };
}

const config: ConfigStore = {
  initialState: {
    ...dialogState,
    ...snackbarState,
    ...searchState,
    ...playerState,
    ...dataState,
    ...appState
  },
  actionsCreators: {
    ...dialogActions,
    ...snackbarActions,
    ...searchActions,
    ...playerActions,
    ...dataActions,
    ...appActions
  }
};

export const { Provider, connect, actions, getState } = createStore(config);
