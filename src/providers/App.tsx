import AsyncStorage from '@react-native-community/async-storage';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { createContext } from 'react';
import Snackbar from '../components/Snackbar';
import { initI18n } from '../i18n';

const AppSettingsContext = createContext(null);

export const getCachedSettings = async () => {
  try {
    const [
      skipLogin,
      darkMode,
      searchHistory,
      instance,
      token,
      playlists,
      favorisPlaylist,
      logoutMode,
      username,
      sendErrorMonitoring,
      language,
      lastPlays,
      customInstances
    ] = await Promise.all([
      AsyncStorage.getItem('skipLogin'),
      AsyncStorage.getItem('darkMode'),
      AsyncStorage.getItem('searchHistory'),
      AsyncStorage.getItem('instance'),
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('playlists'),
      AsyncStorage.getItem('favorisPlaylist'),
      AsyncStorage.getItem('logoutMode'),
      AsyncStorage.getItem('username'),
      AsyncStorage.getItem('sendErrorMonitoring'),
      AsyncStorage.getItem('language'),
      AsyncStorage.getItem('lastPlays'),
      AsyncStorage.getItem('customInstances')
    ]);

    return {
      skipLogin: JSON.parse(skipLogin) ?? false,
      instance,
      token,
      username,
      darkMode: JSON.parse(darkMode) ?? false,
      history: JSON.parse(searchHistory) ?? [],
      playlists: JSON.parse(playlists) ?? [],
      favorisPlaylist: JSON.parse(favorisPlaylist) ?? null,
      logoutMode: !Boolean(token),
      sendErrorMonitoring: JSON.parse(sendErrorMonitoring) ?? false,
      language: language ?? 'en',
      lastPlays: JSON.parse(lastPlays) ?? [],
      customInstances: JSON.parse(customInstances) ?? []
    };
  } catch (error) {
    console.log(error);
  }
};

export const AppSettingsProvider = ({ children, data }) => {
  const [state, setState] = useState(data);

  const setAppSettings = useCallback(
    value => {
      setState(prevState => ({ ...prevState, ...value }));
    },
    [setState]
  );

  const value = useMemo(
    () => ({ state, setAppSettings }),
    [state, setAppSettings]
  );

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);

  if (!context) {
    throw new Error('useAppSettings must be used within a AppSettingsContext');
  }

  const setSettings = useMemo(
    () => ({
      skipLogin: async (skipLogin: string): void => {
        await AsyncStorage.setItem('skipLogin', JSON.stringify(skipLogin));
      },
      darkMode: async (darkMode: Boolean): void => {
        await AsyncStorage.setItem('darkMode', JSON.stringify(darkMode));
        context.setAppSettings({ darkMode });
      },
      language: async (language: string): void => {
        await AsyncStorage.setItem('language', language);
        context.setAppSettings({ language });
        initI18n();
      },
      username: async (username: string): void => {
        await AsyncStorage.setItem('username', username);
        context.setAppSettings({ username });
      },
      sendErrorMonitoring: async (sendErrorMonitoring: Boolean): void => {
        await AsyncStorage.setItem(
          'sendErrorMonitoring',
          JSON.stringify(sendErrorMonitoring)
        );
        context.setAppSettings({ sendErrorMonitoring });
      },
      customInstance: async (instance: Boolean): void => {
        const customInstances = [...context.state.customInstances, instance];
        await AsyncStorage.setItem(
          'customInstances',
          JSON.stringify(customInstances)
        );
        context.setAppSettings({ customInstances });
      },
      removeCustomInstance: async (instanceUri: string): void => {
        const customInstances = context.state.customInstances.filter(
          ({ uri }) => uri !== instanceUri
        );
        await AsyncStorage.setItem(
          'customInstances',
          JSON.stringify(customInstances)
        );
        context.setAppSettings({ customInstances });
      },
      setInstance: async (instance: string) => {
        await AsyncStorage.setItem(
          'instance',
          JSON.stringify(instance)
        );
        context.setAppSettings({ instance });
      }
    }),
    [context]
  );

  return { settings: context.state, setSettings };
};
