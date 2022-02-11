import AsyncStorage from "@react-native-community/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import { ApiRoutes } from "../constants";
import callApi from "../utils/callApi";
import { usePlaylist } from "./Playlist";

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
      username,
      sendErrorMonitoring,
      language,
      lastPlays,
      customInstances,
      instancesTokens,
    ] = await Promise.all([
      AsyncStorage.getItem("skipLogin"),
      AsyncStorage.getItem("darkMode"),
      AsyncStorage.getItem("searchHistory"),
      AsyncStorage.getItem("instance"),
      AsyncStorage.getItem("token"),
      AsyncStorage.getItem("playlists"),
      AsyncStorage.getItem("favorisPlaylist"),
      AsyncStorage.getItem("username"),
      AsyncStorage.getItem("sendErrorMonitoring"),
      AsyncStorage.getItem("language"),
      AsyncStorage.getItem("lastPlays"),
      AsyncStorage.getItem("customInstances"),
      AsyncStorage.getItem("instancesTokens"),
    ]);

    console.log(instancesTokens);

    return {
      skipLogin: JSON.parse(skipLogin) ?? false,
      instance: instance?.replace(/"/g, ""),
      token,
      username,
      darkMode: JSON.parse(darkMode) ?? false,
      history: JSON.parse(searchHistory) ?? [],
      playlists: JSON.parse(playlists) ?? [],
      favorisPlaylist: JSON.parse(favorisPlaylist) ?? null,
      logoutMode: !Boolean(token),
      sendErrorMonitoring: JSON.parse(sendErrorMonitoring) ?? false,
      language: language ?? "en",
      lastPlays: JSON.parse(lastPlays) ?? [],
      customInstances: JSON.parse(customInstances) ?? [],
      instancesTokens: JSON.parse(instancesTokens) ?? {},
    };
  } catch (error) {
    console.log(error);
  }
};

export const AppSettingsProvider = ({ children, data }) => {
  const [state, setState] = useState(data);

  const setAppSettings = useCallback(
    (value) => {
      setState((prevState) => ({ ...prevState, ...value }));
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
  const { i18n } = useTranslation();

  if (!context) {
    throw new Error("useAppSettings must be used within a AppSettingsContext");
  }

  const setSettings = useMemo(
    () => ({
      skipLogin: async ({ instance }): void => {
        await AsyncStorage.setItem("skipLogin", JSON.stringify(true));

        context.setAppSettings({
          instance,
          logoutMode: true,
        });
      },
      darkMode: async (darkMode: Boolean): void => {
        await AsyncStorage.setItem("darkMode", JSON.stringify(darkMode));
        context.setAppSettings({ darkMode });
      },
      language: async (language: string): void => {
        await AsyncStorage.setItem("language", language);
        context.setAppSettings({ language });
        i18n.changeLanguage(language);
      },
      username: async (username: string): void => {
        await AsyncStorage.setItem("username", username);
        context.setAppSettings({ username });
      },
      sendErrorMonitoring: async (sendErrorMonitoring: Boolean): void => {
        await AsyncStorage.setItem(
          "sendErrorMonitoring",
          JSON.stringify(sendErrorMonitoring)
        );
        context.setAppSettings({ sendErrorMonitoring });
      },
      customInstance: async (instance: Boolean): void => {
        const customInstances = [...context.state.customInstances, instance];
        await AsyncStorage.setItem(
          "customInstances",
          JSON.stringify(customInstances)
        );
        context.setAppSettings({ customInstances });
      },
      removeCustomInstance: async (instanceUri: string): void => {
        const customInstances = context.state.customInstances.filter(
          ({ uri }) => uri !== instanceUri
        );
        await AsyncStorage.setItem(
          "customInstances",
          JSON.stringify(customInstances)
        );
        context.setAppSettings({ customInstances });
      },
      setInstance: async (instance: string) => {
        alert(instance);
        await AsyncStorage.setItem("instance", JSON.stringify(instance));
        context.setAppSettings({ instance });
      },
      removeToken: async (token: string, instance: string) => {
        const instancesTokens = context.state.instancesTokens;
        const theInstance = instancesTokens[instance];

        const test = theInstance.filter((t: string) => t !== token);

        instancesTokens[instance] = test;

        if (test.length === 0) {
          delete instancesTokens[instance];
        }

        await AsyncStorage.setItem(
          "instancesTokens",
          JSON.stringify(instancesTokens)
        );
        context.setAppSettings({ instancesTokens });
      },
      setToken: async (token: string, instance: string) => {
        await callApi({
          url: ApiRoutes.Preferences,
          customToken: token,
        });

        const instancesTokens = {
          ...context.state.instancesTokens,
          [instance]: [
            ...(context.state.instancesTokens[instance] ?? []),
            token,
          ],
        };

        await Promise.all([
          AsyncStorage.setItem(
            "instancesTokens",
            JSON.stringify(instancesTokens)
          ),
          AsyncStorage.setItem("token", token),
        ]);
        context.setAppSettings({ token, instance, instancesTokens });
      },
      useToken: async (token: string, instance: string) => {
        await Promise.all([
          AsyncStorage.setItem("token", token),
          AsyncStorage.setItem("instance", instance),
        ]);
        context.setAppSettings({ token, instance });
      },
    }),
    [context]
  );

  return { settings: context.state, setSettings };
};
