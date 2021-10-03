export interface Snackbar {
  message: null | string;
  visible: boolean;
  action: SnackbarAction;
}

interface SnackbarAction {
  label: string;
  onPress: () => null | void;
}
