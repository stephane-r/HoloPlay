import React from 'react';
import { Text, Button } from 'react-native-paper';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import DataEmpty from '../../components/Data/Empty';
import useStore from '../../hooks/useStore';
import { actions } from '../../store';
import FavorisPlaylistContainer from '../../containers/Favoris/Playlist';
import callApi from '../../utils/callApi';
import { ApiRoutes, FAVORIS_PLAYLIST_TITLE } from '../../constants';

interface Props {
  navigation: any;
}

const Favoris: React.FC<Props> = ({ navigation }) => {
  const store = useStore();
  const favoris = store.playlists.find((p) => p.title === 'favoris');

  const setFavorisPlaylist = async () => {
    try {
      await callApi({
        url: ApiRoutes.Playlists,
        method: 'POST',
        body: {
          title: FAVORIS_PLAYLIST_TITLE,
          privacy: 'public'
        }
      });

      return setTimeout(
        () => actions.setFlashMessage(`Playlist Favoris was created.`),
        500
      );
    } catch (error) {
      return setTimeout(
        () => actions.setFlashMessage(`Playlist Favoris not created.`),
        500
      );
    }
  };

  return (
    <Layout navigation={navigation}>
      <Header title="Favoris" backgroundColor="#EE05F2" />
      {favoris ? (
        <FavorisPlaylistContainer />
      ) : (
        <>
          <Text accessibilityStates={[]}>
            Your favoris playlist is not set.
          </Text>
          {/* @ts-ignore */}
          <Button onPress={setFavorisPlaylist} mode="outlined">
            Set Favoris playlist
          </Button>
        </>
      )}
    </Layout>
  );
};

// @ts-ignore
Favoris.path = 'favoris';

// @ts-ignore
Favoris.navigationOptions = () => ({
  title: 'Favoris',
  linkName: 'Favoris'
});

export default Favoris;
