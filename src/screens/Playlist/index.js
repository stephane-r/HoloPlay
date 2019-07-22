// @flow
import React, { useState } from 'react';
import { Portal, FAB } from 'react-native-paper';
import { useQuery } from 'react-apollo-hooks';
import PlaylistContainer from '../../containers/Playlist';
import Layout from '../../components/Layout';
import DialogAddPlaylistContainer from '../../containers/DialogAddPlaylist';
import Header from '../../components/Header';
import GET_USER from '../../graphql/query/me';

type PlaylistScreenProps = {
  navigation: Object
};

const PlaylistScreen = ({ navigation }: PlaylistScreenProps) => {
  const [modalIsOpen, setToggleModal] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [fabIsOpen, toggleFab] = useState(false);

  const { data } = useQuery(GET_USER);

  const toggleModal = async (item = null) => {
    if (item && item.id) {
      setPlaylist(item);
    }

    setToggleModal(!modalIsOpen);
  };

  return (
    <Layout navigation={navigation}>
      <Header
        title="Playlist"
        backgroundColor="#0455BF" />
      <PlaylistContainer
        userId={data.userMe.id}
        toggleModal={playlist => toggleModal(playlist)}
      />
      <DialogAddPlaylistContainer
        visible={modalIsOpen}
        toggleDialog={toggleModal}
        playlist={playlist}
        userId={data.userMe.id}
      />
      <Portal>
        <FAB.Group
          open={fabIsOpen}
          icon={fabIsOpen ? 'today' : 'add'}
          actions={[
            {
              icon: 'headset',
              label: 'New playlist',
              onPress: () => setToggleModal(true)
            }
          ]}
          onStateChange={({ open }) => toggleFab(open)}
          fabStyle={{ marginBottom: 70 }}
        />
      </Portal>
    </Layout>
  );
};

PlaylistScreen.path = 'playlist';

PlaylistScreen.navigationOptions = () => ({
  title: 'Playlist',
  linkName: 'Playlist'
});

export default PlaylistScreen;
