// @flow
import React from 'react';
import config from 'react-native-config';
import GestureRecognizer from 'react-native-swipe-gestures';
// eslint-disable-next-line import/no-unresolved
import QuickActions from 'react-native-quick-actions';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import NavigationContainer from '../../navigation/TabNavigator';
import SidebarContainer from '../../containers/Sidebar';
import StorybookUI from '../../../storybook';
import SnackbarContainer from '../../containers/Snackbar';
import { actions } from '../../store';

type AppProps = {
  darkMode: boolean
};

const { STORYBOOK } = config;

QuickActions.isSupported((error, supported) => {
  if (supported) {
    return QuickActions.setShortcutItems([
      {
        type: 'Orders',
        title: 'Playlist',
        icon: 'Compose',
        userInfo: {
          url: 'app://playlist'
        }
      },
      {
        type: 'Orders',
        title: 'Favoris',
        icon: 'Compose',
        userInfo: {
          url: 'app://favoris'
        }
      }
    ]);
  }

  return error;
});

const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2575f4',
    accent: '#0455BF'
  }
};

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2575f4',
    accent: '#0455BF'
  }
};

const swipConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

const App = ({ darkMode, userId }: AppProps) => {
  if (STORYBOOK === 'true') {
    return <StorybookUI />;
  }

  return (
    <PaperProvider theme={darkMode ? darkTheme : defaultTheme}>
      <GestureRecognizer
        onSwipeLeft={actions.showPlayer}
        config={swipConfig}
        style={{
          flex: 1
        }}>
        <SidebarContainer />
        <NavigationContainer
          screenProps={{
            userId
          }}
        />
        <SnackbarContainer />
      </GestureRecognizer>
    </PaperProvider>
  );
};

export default App;
