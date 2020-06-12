import React, { useState } from 'react';
import { Portal, FAB } from 'react-native-paper';
import { withNavigationFocus } from 'react-navigation';
import Layout from '../../components/Layout';
import DialogAddPlaylist from '../../components/Dialog/AddPlaylist';
import Header from '../../components/Header';
import Playlist from '../../components/Playlist/List';
import PlaylistsContainer from '../../containers/Playlists/List';
import { Playlist as PlaylistType } from '../../types/Api';

interface Props {
  isFocused: boolean;
  navigation: any;
}

const PlaylistScreen: React.FC<Props> = ({ navigation, isFocused }) => {
  const [modalIsOpen, setToggleModal] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<null | PlaylistType>(null);
  const [fabIsOpen, toggleFab] = useState<boolean>(false);

  const toggleModal = (item: null | PlaylistType = null): void => {
    if (item?.playlistId) {
      setPlaylist(item);
    }

    setToggleModal(!modalIsOpen);
  };

  return (
    <Layout navigation={navigation}>
      <Header title="Playlist" backgroundColor="#0455BF" />
      <PlaylistsContainer
        toggleModal={(test: PlaylistType): void => {
          setPlaylist(test);
          toggleModal();
        }}
      />
      <DialogAddPlaylist
        visible={modalIsOpen}
        toggleDialog={toggleModal}
        playlist={playlist as PlaylistType}
      />
      {isFocused && (
        <Portal>
          <FAB.Group
            open={fabIsOpen}
            visible={fabIsOpen}
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
      )}
    </Layout>
  );
};

// @ts-ignore
PlaylistScreen.path = 'playlist';

// @ts-ignore
PlaylistScreen.navigationOptions = (): void => ({
  title: 'Playlist',
  linkName: 'Playlist'
});

export default withNavigationFocus(PlaylistScreen);
