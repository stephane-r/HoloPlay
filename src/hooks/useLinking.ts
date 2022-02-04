import { useSnackbar } from "../providers/Snackbar";
import { Linking } from "react-native";

interface UseLinkingHook {
  openUrl: (url: string) => Promise<void>;
}

const useLinking = (): UseLinkingHook => {
  const snackbar = useSnackbar();

  const openUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      snackbar.show(`Don't know how to open this URL: ${url}`);
    }
  };

  return {
    openUrl,
  };
};

export default useLinking;
