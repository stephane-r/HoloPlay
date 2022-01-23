import React, { useState, useCallback } from 'react';
import { useTheme, IconButton } from 'react-native-paper';
import Layout from '../../components/Layout';
import DialogAddPlaylist from '../../components/Dialog/AddPlaylist';
import Header from '../../components/Header';
import { PlaylistList } from '../../components/Playlist/List';
import Spacer from '../../components/Spacer';

const PlaylistScreen: React.FC = () => {
  const [dialogAddPlaylistVisible, setDialogAddPlaylistVisible] =
    useState<boolean>(false);
  const { colors } = useTheme();

  const toggleModal = useCallback((): void => {
    setDialogAddPlaylistVisible(visible => !visible);
  }, []);

  return (
    <Layout>
      <Header title="Playlists" backgroundColor={colors.screens.playlists}>
        <IconButton
          icon="plus"
          color="white"
          style={{ margin: 0 }}
          onPress={setDialogAddPlaylistVisible}
        />
      </Header>
      <Spacer height={18} />
      <PlaylistList />
      <DialogAddPlaylist
        visible={dialogAddPlaylistVisible}
        toggleDialog={toggleModal}
      />
    </Layout>
  );
};

export default PlaylistScreen;
