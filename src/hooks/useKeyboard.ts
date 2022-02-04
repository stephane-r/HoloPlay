import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

interface UseKeyboardHook {
  visible: boolean;
  dismiss: () => void;
}

const useKeyboard = (config = {}): UseKeyboardHook => {
  const { useWillShow = false, useWillHide = false } = config;
  const [visible, setVisible] = useState(false);
  const showEvent = useWillShow ? "keyboardWillShow" : "keyboardDidShow";
  const hideEvent = useWillHide ? "keyboardWillHide" : "keyboardDidHide";

  const dismiss = () => {
    Keyboard.dismiss();
    setVisible(false);
  };

  const onKeyboardShow = () => {
    setVisible(true);
  };

  const onKeyboardHide = () => {
    setVisible(false);
  };

  useEffect(() => {
    Keyboard.addListener(showEvent, onKeyboardShow);
    Keyboard.addListener(hideEvent, onKeyboardHide);

    return () => {
      Keyboard.removeListener(showEvent, onKeyboardShow);
      Keyboard.removeListener(hideEvent, onKeyboardHide);
    };
  }, [useWillShow, useWillHide, showEvent, hideEvent]);

  return [visible, dismiss];
};

export default useKeyboard;
