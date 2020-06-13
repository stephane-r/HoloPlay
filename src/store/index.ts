// @ts-ignore
import createStore from 'react-waterfall';
import { searchState, searchActions, SearchState } from '../actions/Search';
import { playerState, playerActions, PlayerState } from '../actions/Player';
import { dataState, dataActions, DataState } from '../actions/Data';
import { appState, appActions, AppState } from '../actions/App';

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
