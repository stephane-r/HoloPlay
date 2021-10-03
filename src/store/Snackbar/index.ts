import AsyncStorage from '@react-native-community/async-storage';
import { Store } from '../../store';
import { CustomInstance, Snackbar, Video } from '../../types';

export interface SnackbarState {
  snackbar: Snackbar;
}

const snackbarState: SnackbarState = {
  snackbar: {
    message: null,
    visible: false,
    action: {
      label: 'Close',
      onPress: (): null => null
    }
  }
};

const snackbarActions = {
  setSnackbar: (store: Store, actions: any, snackbar: Snackbar): Store => {
    if (snackbar.action) {
      setTimeout((): void => actions.setDefaultSnackbarAction(), 7000);
    }

    return {
      ...store,
      snackbar: {
        ...store.snackbar,
        ...snackbar,
        visible: true
      }
    };
  },
  hideSnackbar: (store: Store): Store => ({
    ...store,
    snackbar: {
      ...store.snackbar,
      visible: false
    }
  }),
  setDefaultSnackbarAction: (store: Store): Store => ({
    ...store,
    snackbar: {
      ...store.snackbar,
      action: snackbarState.snackbar.action
    }
  })
};

export { snackbarState, snackbarActions };
