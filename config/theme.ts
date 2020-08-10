import { DarkTheme, DefaultTheme } from 'react-native-paper';

export const DASHBOARD_COLOR = '#2575f4';
export const PLAYLISTS_COLOR = '#fe5f55';
export const FAVORIS_COLOR = '#EE05F2';

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#111111',
    surface: '#1d1d1d',
    favoris: DarkTheme.colors.accent,
    fabGroup: DarkTheme.colors.accent,
    screens: {
      dashboard: '#2d2d2d',
      playlists: '#2d2d2d',
      favoris: '#2d2d2d'
    }
  }
};

export const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: DASHBOARD_COLOR,
    background: '#f5f6f9',
    favoris: FAVORIS_COLOR,
    fabGroup: PLAYLISTS_COLOR,
    screens: {
      dashboard: DASHBOARD_COLOR,
      playlists: PLAYLISTS_COLOR,
      favoris: FAVORIS_COLOR
    }
  }
};
