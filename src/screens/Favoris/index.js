// @flow
import React from 'react';
import { Text, Button } from 'react-native-paper';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import ResultList from '../../components/Result/List';
import DataEmpty from '../../components/Data/Empty';
import useCallApi from '../../hooks/useCallApi';
import useStore from '../../hooks/useStore';
import { actions } from '../../store';
import FavorisPlaylistContainer from '../../containers/FavorisPlaylist';

type ScreenProps = {
  userId: number
};

type FavorisProps = {
  navigation: Object,
  screenProps: ScreenProps
};

const Favoris = ({ navigation }: FavorisProps) => {
  const store = useStore();
  const favoris = store.playlists.find(p => p.title === 'favoris');

  const setFavorisPlaylist = async () => {
    try {
      await fetch(`${store.instance}/api/v1/auth/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${store.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'favoris',
          privacy: 'public'
        })
      });

      return setTimeout(
        () => actions.setFlashMessage(`Playlist Favoris was created.`),
        500
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout navigation={navigation}>
      <Header title="Favoris" backgroundColor="#EE05F2" />
      {favoris ? (
        <FavorisPlaylistContainer setPlaylistFrom="favoris" isFavoris />
      ) : (
        <>
          <Text>Your favoris playlist is not set.</Text>
          <Button onPress={setFavorisPlaylist} mode="outline">
            Set Favoris playlist
          </Button>
        </>
      )}
    </Layout>
  );
};

Favoris.path = 'favoris';

Favoris.navigationOptions = () => ({
  title: 'Favoris',
  linkName: 'Favoris'
});

export default Favoris;
