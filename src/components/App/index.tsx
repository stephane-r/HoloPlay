import React, { useState, memo, useRef, useEffect } from 'react';
import config from 'react-native-config';
import QuickActions from 'react-native-quick-actions';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StorybookUI from '../../../storybook';
import SnackbarContainer from '../../containers/Snackbar';
import { actions } from '../../store';
import SidebarContainer from '../../containers/Sidebar';
import LoadingScreen from '../../screens/Loading';
import DashboardScreen from '../../screens/Dashboard';
import PlaylistsScreen from '../../screens/Playlists';
import FavorisScreen from '../../screens/Favoris';
import LoginScreen from '../../screens/Login';
import callApi from '../../utils/callApi';
import { Playlist, QuickAction } from '../../types';
import { ApiRoutes, FAVORIS_PLAYLIST_TITLE } from '../../constants';
import { darkTheme, defaultTheme } from '../../../config/theme';
import {
  quickActionShortcutItems,
  QUICK_ACTION_PLAYLISTS,
  QUICK_ACTION_FAVORIS
} from '../../../config/quickAction';
import fetchPlaylists from '../../utils/fetchPlaylists';
import SettingsScreen from '../../screens/Settings';

QuickActions.isSupported((error, supported) => {
  if (supported) {
    return QuickActions.setShortcutItems(quickActionShortcutItems);
  }

  return error;
});

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

interface Props {
  darkMode: boolean;
}

const App: React.FC<Props> = ({ darkMode }) => {
  const navigation = useRef(null);
  const [appToken, setToken] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  actions.appInit();

  useEffect(() => {
    QuickActions.popInitialAction()
      .then(async (action: QuickAction) => {
        const [instance, token] = await Promise.all([
          AsyncStorage.getItem('instance'),
          AsyncStorage.getItem('token')
        ]);

        if (!instance || !token) {
          return setIsLoading(false);
        }

        try {
          await fetchPlaylists();
        } catch (error) {
          // TODO: Add sentry exception
          console.log(error);
          return setIsLoading(false);
        }

        setToken(token);
        setIsLoading(false);

        if (action?.title) {
          switch (true) {
            case action.title === QUICK_ACTION_FAVORIS:
              return navigation.current?.navigate('Favoris');
            case action.title === QUICK_ACTION_PLAYLISTS:
              return navigation.current?.navigate('Playlists');
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);

  if (config.STORYBOOK === 'true') {
    return <StorybookUI />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PaperProvider theme={darkMode ? darkTheme : defaultTheme}>
      <SidebarContainer />
      <NavigationContainer ref={navigation}>
        {appToken === null ? (
          <Stack.Navigator headerMode="none">
            <Stack.Screen
              name="Auth"
              component={LoginScreen}
              initialParams={{ setToken }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Test" component={AppScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <SnackbarContainer />
    </PaperProvider>
  );
};

const AppScreen = () => (
  <Tab.Navigator shifting>
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={tabOptions('home', '#2575f4')}
    />
    <Tab.Screen
      name="Playlists"
      component={PlaylistsScreen}
      options={tabOptions('headset', '#0455BF')}
    />
    <Tab.Screen
      name="Favoris"
      component={FavorisScreen}
      options={tabOptions('heart', '#EE05F2')}
    />
  </Tab.Navigator>
);

const tabOptions = (iconName: string, tabBarColor: string): any => ({
  tabBarIcon: ({ tintColor }: any): any => (
    <MaterialCommunityIcons
      name={iconName}
      size={23}
      style={{ color: 'white' }}
    />
  ),
  tabBarColor
});

export default memo(App);
