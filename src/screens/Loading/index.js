// @flow
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import QuickActions from 'react-native-quick-actions';
import { actions } from '../../store';

const TITLE_FAVORIS = 'Favoris';
const TITLE_PLAYLIST = 'Playlist';

type LoadingScreenProps = {
  navigation: Object
};

const LoadingScreen = (props: LoadingScreenProps) => {
  actions.appInit();

  QuickActions.popInitialAction().then(async action => {
    const instance = await AsyncStorage.getItem('instance');
    const token = await AsyncStorage.getItem('token');

    if (!instance || !token) {
      return props.navigation.navigate('Auth');
    }

    const preferencesRequest = await fetch(
      `${instance}/api/v1/auth/preferences`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const preferences = await preferencesRequest.json();

    if (preferences) {
      const playlistsRequest = await fetch(
        `${instance}/api/v1/auth/playlists`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const playlists = await playlistsRequest.json();

      console.log(playlists);

      const favorisPlaylist = playlists.find(p => p.title === 'favoris');

      actions.receivePlaylists(playlists);

      if (favorisPlaylist) {
        actions.receiveFavorisPlaylist(favorisPlaylist);
      }
    }

    actions.setConnected();

    if (action && action.title) {
      switch (true) {
        case action.title === TITLE_FAVORIS:
          return props.navigation.navigate(TITLE_FAVORIS);
        case action.title === TITLE_PLAYLIST:
          return props.navigation.navigate(TITLE_PLAYLIST);
      }
    }

    return props.navigation.navigate('App');
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
