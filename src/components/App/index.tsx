import {
  Provider as PaperProvider,
  Button,
  useTheme
} from 'react-native-paper';
import React, { useState, memo, useRef, useEffect } from 'react';
import config from 'react-native-config';
import QuickActions from 'react-native-quick-actions';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNBootSplash from 'react-native-bootsplash';
import SnackbarContainer from '../../containers/Snackbar';
import { actions } from '../../store';
import LoadingScreen from '../../screens/Loading';
import DashboardScreen from '../../screens/Dashboard';
import PlaylistsScreen from '../../screens/Playlists';
import FavorisScreen from '../../screens/Favoris';
import LoginScreen from '../../screens/Login';
import callApi from '../../utils/callApi';
import { Playlist, QuickAction } from '../../types';
import { ApiRoutes, FAVORIS_PLAYLIST_TITLE } from '../../constants';
import {
  darkTheme,
  defaultTheme,
  FAVORIS_COLOR,
  PLAYLISTS_COLOR,
  DASHBOARD_COLOR
} from '../../../config/theme';
import {
  QUICK_ACTION_PLAYLISTS,
  QUICK_ACTION_FAVORIS
} from '../../../config/quickAction';
import fetchPlaylists from '../../utils/fetchPlaylists';
import SettingsScreen from '../../screens/Settings';
import { Animated, Dimensions, View, LogBox } from 'react-native';
import AppPlayer from '../AppPlayer';
import useUpdateRelease from '../../hooks/useUpdateRelease';
import { useTranslation } from 'react-i18next';
import SearchScreen from '../../screens/Search';
import DialogAddVideoToPlaylistContainer from '../../containers/DialogAddVideoToPlaylist';
import { DrawerLayoutAndroid } from 'react-native-gesture-handler';
import DrawlerContainer from '../../containers/Drawler';

// :troll:
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

interface Props {
  darkMode: boolean;
}

const App: React.FC<Props> = () => {
  const navigation = useRef(null);
  const drawler = useRef(null);
  const [appToken, setToken] = useState<null | string>(null);
  const [appLogoutMode, setLogoutMode] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState(false);

  useUpdateRelease(true);

  const toggleTheme = (value: boolean): void => {
    setDarkMode(value);
    AsyncStorage.setItem('darkMode', JSON.stringify(value));
  };

  const theme = darkMode ? darkTheme : defaultTheme;

  useEffect(() => {
    actions.appInit();

    QuickActions.popInitialAction()
      .then(async (action: QuickAction) => {
        const [instance, token, logoutMode, isDarkmode] = await Promise.all([
          AsyncStorage.getItem('instance'),
          AsyncStorage.getItem('token'),
          AsyncStorage.getItem('logoutMode'),
          AsyncStorage.getItem('darkMode')
        ]);

        setDarkMode(JSON.parse(isDarkmode));

        const logoutModeParsed = JSON.parse(logoutMode);

        if (token && !logoutModeParsed) {
          try {
            await fetchPlaylists();
          } catch (error) {
            return setIsLoading(false);
          }
        }

        if (token) {
          setToken(token);
        }

        setLogoutMode(logoutModeParsed);
        setIsLoading(false);

        RNBootSplash.hide({ duration: 250 });

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigation}>
        {appToken === null && !appLogoutMode ? (
          <Stack.Navigator headerMode="none">
            <Stack.Screen
              name="Auth"
              component={LoginScreen}
              initialParams={{ setToken }}
            />
          </Stack.Navigator>
        ) : (
          <DrawerLayoutAndroid
            ref={drawler}
            drawerWidth={300}
            renderNavigationView={() => (
              <DrawlerContainer
                setTheme={toggleTheme}
                navigation={navigation}
                drawler={drawler}
              />
            )}>
            <Stack.Navigator headerMode="none">
              <Stack.Screen
                name="App"
                component={AppScreen}
                initialParams={{ toggleTheme }}
              />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
          </DrawerLayoutAndroid>
        )}
      </NavigationContainer>
      <SnackbarContainer />
      <AppPlayer />
      <DialogAddVideoToPlaylistContainer />
    </PaperProvider>
  );
};

const AppScreen = ({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator shifting>
      <Tab.Screen
        name={t('navigation.dashboard')}
        component={DashboardScreen}
        options={tabOptions('home', 23, colors.screens.dashboard)}
        initialParams={route.params}
      />
      <Tab.Screen
        name={t('navigation.search')}
        component={SearchScreen}
        options={tabOptions('magnify', 25, colors.screens.search)}
        initialParams={route.params}
      />
      <Tab.Screen
        name={t('navigation.playlists')}
        component={PlaylistsScreen}
        options={tabOptions('headset', 23, colors.screens.playlists)}
        initialParams={route.params}
      />
      <Tab.Screen
        name={t('navigation.favoris')}
        component={FavorisScreen}
        options={tabOptions('heart', 23, colors.screens.favoris)}
        initialParams={route.params}
      />
    </Tab.Navigator>
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
      style={{ color: 'white' }}
    />
  ),
  tabBarColor
});

export default memo(App);
