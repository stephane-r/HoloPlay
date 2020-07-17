import React, { useState } from 'react';
import { Portal, FAB } from 'react-native-paper';
import Layout from '../../components/Layout';
import DialogAddPlaylist from '../../components/Dialog/AddPlaylist';
import Header from '../../components/Header';
import Playlist from '../../components/Playlist/List';
import PlaylistsContainer from '../../containers/Playlists/List';
import { Playlist as PlaylistType } from '../../types/Api';
import { useIsFocused } from '@react-navigation/native';
import { PLAYLISTS_COLOR } from '../../../config/theme';
import { StyleSheet } from 'react-native';

const PlaylistScreen: React.FC = () => {
  const [modalIsOpen, setToggleModal] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<null | PlaylistType>(null);
  const [fabIsOpen, toggleFab] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const toggleModal = (item: null | PlaylistType = null): void => {
    if (item?.playlistId) {
      setPlaylist(item);
    }

    setToggleModal(!modalIsOpen);
  };

  return (
    <Layout>
      <Header title="Playlists" backgroundColor={PLAYLISTS_COLOR} />
      <PlaylistsContainer
        toggleModal={(item: PlaylistType): void => {
          setPlaylist(item);
          toggleModal();
        }}
      />
      <DialogAddPlaylist
        visible={modalIsOpen}
        toggleDialog={toggleModal}
        playlist={playlist as PlaylistType}
      />
      <Portal>
        <FAB.Group
          visible={isFocused}
          open={fabIsOpen}
          icon={fabIsOpen ? 'close' : 'plus'}
          actions={[
            {
              icon: 'headset',
              label: 'New playlist',
              onPress: (): void => setToggleModal(true)
            }
          ]}
          onStateChange={({ open }): void => toggleFab(open)}
          fabStyle={style.fab}
          color="white"
        />
      </Portal>
    </Layout>
  );
};

const style = StyleSheet.create({
  fab: {
    marginBottom: 70,
    backgroundColor: PLAYLISTS_COLOR
  }
});

export default PlaylistScreen;
