// @flow
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import QuickActions from 'react-native-quick-actions';
import { actions } from '../../store';
import GET_USER from '../../query/me';

const TITLE_FAVORIS = 'Favoris';
const TITLE_PLAYLIST = 'Playlist';

type LoadingScreenProps = {
  navigation: Object
};

const LoadingScreen = (props: LoadingScreenProps) => {
  actions.appInit();

  const { data, error } = useQuery(GET_USER);

  if (data && data.me) {
    QuickActions.popInitialAction().then(async action => {
      if (action && action.title) {
        switch (true) {
          case action.title === TITLE_FAVORIS:
            return props.navigation.navigate(TITLE_FAVORIS);
          case action.title === TITLE_PLAYLIST:
            return props.navigation.navigate(TITLE_PLAYLIST);
        }
      }

      actions.setConnected();
      actions.search();

      return props.navigation.navigate('App');
    });
  }

  if (error) {
    return props.navigation.navigate('Auth');
  }

  return <ActivityIndicator />;
};

export default LoadingScreen;
