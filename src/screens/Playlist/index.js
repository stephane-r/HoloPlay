// @flow
import React, { useState } from 'react';
import { Portal, FAB } from 'react-native-paper';
import Layout from '../../components/Layout';
import DialogAddPlaylist from '../../components/Dialog/AddPlaylist';
import Header from '../../components/Header';
import Playlist from '../../components/Playlist/List';

type ScreenProps = {
  userId: number
};

type PlaylistScreenProps = {
  navigation: Object,
  screenProps: ScreenProps
};

const PlaylistScreen = ({ navigation, ...props }: PlaylistScreenProps) => {
  const [modalIsOpen, setToggleModal] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [fabIsOpen, toggleFab] = useState(false);

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
      <Playlist
        userId={props.screenProps.userId}
        toggleModal={playlist => toggleModal(playlist)}
      />
      <DialogAddPlaylist
        visible={modalIsOpen}
        toggleDialog={toggleModal}
        playlist={playlist}
        userId={props.screenProps.userId}
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
