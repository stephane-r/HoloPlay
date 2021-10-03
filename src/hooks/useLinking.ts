import { Linking } from 'react-native';
import { useCallback } from 'react';
import { actions } from '../store';

interface UseLinkingHook {
  openUrl: (url: string) => Promise<void>;
}

const useLinking = (): UseLinkingHook => {
  const openUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      actions.setSnackbar({
        message: `Don't know how to open this URL: ${url}`
      });
    }
  };

  return {
    openUrl
  };
};

export default useLinking;
