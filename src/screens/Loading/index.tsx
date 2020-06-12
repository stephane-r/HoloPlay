import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import QuickActions from 'react-native-quick-actions';
import { actions } from '../../store';
import callApi from '../../utils/callApi';
import { ApiRoutes, FAVORIS_PLAYLIST_TITLE } from '../../constants';
import { Playlist } from '../../types';

const TITLE_FAVORIS = 'Favoris';
const TITLE_PLAYLIST = 'Playlist';

interface Props {
  navigation: any;
}

const LoadingScreen: React.FC<Props> = ({ navigation }) => {
  actions.appInit();

  QuickActions.popInitialAction().then(async (action) => {
    const [instance, token] = await Promise.all([
      AsyncStorage.getItem('instance'),
      AsyncStorage.getItem('token')
    ]);

    if (!instance || !token) {
      return navigation.navigate('Auth');
    }

    try {
      const playlists: Playlist[] = await callApi({ url: ApiRoutes.Playlists });
      const favorisPlaylist = playlists.find(
        (p) => p.title === FAVORIS_PLAYLIST_TITLE
      );

      actions.receivePlaylists(playlists);

      if (favorisPlaylist) {
        actions.receiveFavorisPlaylist(favorisPlaylist);
      }
    } catch (error) {
      return navigation.navigate('Auth');
    }

    actions.setConnected();

    if (action && action.title) {
      switch (true) {
        case action.title === TITLE_FAVORIS:
          return navigation.navigate(TITLE_FAVORIS);
        case action.title === TITLE_PLAYLIST:
          return navigation.navigate(TITLE_PLAYLIST);
      }
    }

    return navigation.navigate('App');
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
