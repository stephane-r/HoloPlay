import React from 'react';
// import config from 'react-native-config';
import GestureRecognizer from 'react-native-swipe-gestures';
import QuickActions from 'react-native-quick-actions';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import NavigationContainer from '../../navigation/TabNavigator';
import SidebarContainer from '../../containers/Sidebar';
import StorybookUI from '../../../storybook';
import SnackbarContainer from '../../containers/Snackbar';
import { actions } from '../../store';

// const { STORYBOOK } = config;

QuickActions.isSupported((error, supported) => {
  if (supported) {
    return QuickActions.setShortcutItems([
      {
        type: 'Orders',
        title: 'Playlist',
        icon: 'headset',
        userInfo: {
          url: 'app://playlist'
        }
      },
      {
        type: 'Orders',
        title: 'Favoris',
        icon: 'favorite',
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

interface Props {
  darkMode: boolean;
}

const App: React.FC<Props> = ({ darkMode }) => {
  //   if (STORYBOOK === 'true') {
  //     return <StorybookUI />;
  //   }

  return (
    <PaperProvider theme={darkMode ? darkTheme : defaultTheme}>
      <GestureRecognizer
        onSwipeLeft={actions.showPlayer}
        config={swipConfig}
        style={{
          flex: 1
        }}>
        <SidebarContainer />
        <NavigationContainer />
        <SnackbarContainer />
      </GestureRecognizer>
    </PaperProvider>
  );
};

export default App;