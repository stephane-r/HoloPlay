export interface FlashMessage {
  message: null | string;
  visible: boolean;
  action: FlashMessageAction;
}

interface FlashMessageAction {
  label: string;
  onPress: () => null | void;
}
