import React, { useState } from 'react';
import { Portal, FAB } from 'react-native-paper';
import Layout from '../../components/Layout';
import DialogAddPlaylist from '../../components/Dialog/AddPlaylist';
import Header from '../../components/Header';
import Playlist from '../../components/Playlist/List';
import PlaylistsContainer from '../../containers/Playlists/List';
import { Playlist as PlaylistType } from '../../types/Api';
import { useIsFocused } from '@react-navigation/native';

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
      <Header title="Playlist" backgroundColor="#0455BF" />
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
          fabStyle={{ marginBottom: 70 }}
        />
      </Portal>
    </Layout>
  );
};

export default PlaylistScreen;
