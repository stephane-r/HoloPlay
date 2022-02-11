import AsyncStorage from "@react-native-community/async-storage";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Dimensions, LogBox, View } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import config from "react-native-config";
import { Button, Provider, useTheme } from "react-native-paper";
import QuickActions from "react-native-quick-actions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  QUICK_ACTION_FAVORIS,
  QUICK_ACTION_PLAYLISTS,
} from "../../config/quickAction";
import {
  DASHBOARD_COLOR,
  FAVORIS_COLOR,
  PLAYLISTS_COLOR,
  darkTheme,
  defaultTheme,
} from "../../config/theme";
import { ApiRoutes, FAVORIS_PLAYLIST_TITLE } from "../constants";
import useUpdateRelease from "../hooks/useUpdateRelease";
import {
  AppSettingsProvider,
  getCachedSettings,
  useAppSettings,
} from "../providers/App";
import { DataProvider } from "../providers/Data";
import { FavoriteProvider } from "../providers/Favorite";
import { InstancesProvider } from "../providers/Instances";
import { PlayerProvider } from "../providers/Player";
import { PlaylistProvider } from "../providers/Playlist";
import { SnackbarProvider } from "../providers/Snackbar";
import DashboardScreen from "../screens/Dashboard";
import FavorisScreen from "../screens/Favoris";
import InvidiousInstanceScreen from "../screens/InvidiousInstances";
import LoadingScreen from "../screens/Loading";
import LoginScreen from "../screens/Login";
import PlaylistsScreen from "../screens/Playlists";
import PrivacyPolicyScreen from "../screens/PrivacyPolicy";
import SearchScreen from "../screens/Search";
import SettingsScreen from "../screens/Settings";
import { Playlist, QuickAction } from "../types";
import callApi from "../utils/callApi";
import fetchPlaylists from "../utils/fetchPlaylists";
import { AppPlayer } from "./AppPlayer";

// :troll:
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

interface Props {
  darkMode: boolean;
}

const App: React.FC<Props> = () => {
  const navigation = useRef(null);
  const [initialSettings, setInitialSettings] = useState(null);

  useUpdateRelease(true);

  useEffect(() => {
    getCachedSettings().then((data) => {
      setInitialSettings(data);
      RNBootSplash.hide({ duration: 250 });
    });
  }, []);

  const playlistData = useMemo(
    () => ({
      playlists: initialSettings?.playlists,
      favorisPlaylist: initialSettings?.favorisPlaylist,
    }),
    [initialSettings]
  );

  const favoriteData = useMemo(
    () => ({
      favorisPlaylist: initialSettings?.favorisPlaylist,
      favoriteIds:
        initialSettings?.favorisPlaylist?.videos.map((v) => v.videoId) ?? [],
    }),
    [initialSettings]
  );

  if (!initialSettings) {
    return <LoadingScreen />;
  }

  return (
    <SnackbarProvider>
      <AppSettingsProvider data={initialSettings}>
        <PlaylistProvider data={playlistData}>
          <FavoriteProvider data={favoriteData}>
            <DataProvider data={{ lastPlays: initialSettings.lastPlays }}>
              <PlayerProvider>
                <InstancesProvider>
                  <PaperProvider>
                    <NavigationContainer ref={navigation}>
                      <Stack.Navigator
                        headerMode="none"
                        initialRouteName={
                          initialSettings.skipLogin ? "App" : "Auth"
                        }
                      >
                        <Stack.Screen
                          name="App"
                          component={AppScreen}
                          initialParams={{ initialSettings }}
                        />
                        <Stack.Screen
                          name="Settings"
                          component={SettingsScreen}
                        />
                        <Stack.Screen
                          name="InvidiousInstances"
                          component={InvidiousInstanceScreen}
                        />
                        <Stack.Screen
                          name="PrivacyPolicy"
                          component={PrivacyPolicyScreen}
                        />
                        <Stack.Screen name="Auth" component={LoginScreen} />
                      </Stack.Navigator>
                    </NavigationContainer>
                  </PaperProvider>
                </InstancesProvider>
              </PlayerProvider>
            </DataProvider>
          </FavoriteProvider>
        </PlaylistProvider>
      </AppSettingsProvider>
    </SnackbarProvider>
  );
};

const PaperProvider: React.FC<Props> = ({ children }) => {
  const { settings } = useAppSettings();

  const theme = useMemo(() => {
    return settings.darkMode ? darkTheme : defaultTheme;
  }, [settings.darkMode]);

  return <Provider theme={theme}>{children}</Provider>;
};

const AppScreen = ({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <Tab.Navigator shifting>
        <Tab.Screen
          name={t("navigation.dashboard")}
          component={DashboardScreen}
          options={tabOptions("home", 23, colors.screens.dashboard)}
          initialParams={route.params}
        />
        <Tab.Screen
          name={t("navigation.search")}
          component={SearchScreen}
          options={tabOptions("magnify", 25, colors.screens.search)}
          initialParams={route.params}
        />
        <Tab.Screen
          name={t("navigation.playlists")}
          component={PlaylistsScreen}
          options={tabOptions("headset", 23, colors.screens.playlists)}
          initialParams={route.params}
        />
        <Tab.Screen
          name={t("navigation.favoris")}
          component={FavorisScreen}
          options={tabOptions("heart", 23, colors.screens.favoris)}
          initialParams={route.params}
        />
      </Tab.Navigator>
      <AppPlayer />
    </>
  );
};

const tabOptions = (
  iconName: string,
  iconSize: number,
  tabBarColor: string
): any => ({
  tabBarIcon: ({ tintColor }: any): any => (
    <MaterialCommunityIcons
      name={iconName}
      size={iconSize}
      style={{ color: "white" }}
    />
  ),
  tabBarColor,
});

export default memo(App);
