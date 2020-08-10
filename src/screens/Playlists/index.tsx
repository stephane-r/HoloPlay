import React, { useState } from 'react';
import { Portal, FAB, useTheme } from 'react-native-paper';
import Layout from '../../components/Layout';
import DialogAddPlaylist from '../../components/Dialog/AddPlaylist';
import Header from '../../components/Header';
import Playlist from '../../components/Playlist/List';
import PlaylistsContainer from '../../containers/Playlists/List';
import { Playlist as PlaylistType } from '../../types/Api';
import { useIsFocused } from '@react-navigation/native';
import { PLAYLISTS_COLOR } from '../../../config/theme';
import { StyleSheet } from 'react-native';

const PlaylistScreen: React.FC = ({ route }) => {
  const [modalIsOpen, setToggleModal] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<null | PlaylistType>(null);
  const [fabIsOpen, toggleFab] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const { colors } = useTheme();

  const toggleModal = (item: null | PlaylistType = null): void => {
    if (item?.playlistId) {
      setPlaylist(item);
    }

    setToggleModal(!modalIsOpen);
  };

  return (
    <Layout setTheme={route.params.toggleTheme}>
      <Header title="Playlists" backgroundColor={colors.screens.playlists} />
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
          fabStyle={[
            style.fab,
            {
              backgroundColor: colors.fabGroup
            }
          ]}
          color="white"
        />
      </Portal>
    </Layout>
  );
};

const style = StyleSheet.create({
  fab: {
    marginBottom: 70
  }
});

export default PlaylistScreen;
