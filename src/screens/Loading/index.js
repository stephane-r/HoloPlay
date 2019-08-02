// @flow
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
// eslint-disable-next-line import/no-unresolved
import QuickActions from 'react-native-quick-actions';
import { actions } from '../../store';
import GET_ME from '../../graphql/query/me';

const TITLE_FAVORIS = 'Favoris';
const TITLE_PLAYLIST = 'Playlist';

type LoadingScreenProps = {
  navigation: Object
};

const LoadingScreen = (props: LoadingScreenProps) => {
  actions.appInit();

  const { data, error } = useQuery(GET_ME);

  if (data && data.userMe) {
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

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
