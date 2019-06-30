import React from 'react';
import config from 'react-native-config';
// eslint-disable-next-line import/no-unresolved
import QuickActions from 'react-native-quick-actions';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import NavigationContainer from '../../navigation/TabNavigator';
// import AudioContainer from '../../containers/Audio';
import StorybookUI from '../../../storybook';
import SnackbarContainer from '../../containers/Snackbar';

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

const App = ({ darkMode }) => {
  if (STORYBOOK === 'true') {
    return <StorybookUI />;
  }

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

  return (
    <PaperProvider theme={darkMode ? darkTheme : defaultTheme}>
      <NavigationContainer />
      {/* <AudioContainer /> */}
      <SnackbarContainer />
    </PaperProvider>
  );
};

export default App;
