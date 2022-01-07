import React, { memo, useState } from 'react';
import { Portal, FAB, useTheme } from 'react-native-paper';
import Layout from '../../components/Layout';
import DialogAddPlaylist from '../../components/Dialog/AddPlaylist';
import Header from '../../components/Header';
import { PlaylistsContainer } from '../../containers/Playlists/List';
import { Playlist as PlaylistType } from '../../types/Api';
import { useIsFocused } from '@react-navigation/native';
import { PLAYLISTS_COLOR } from '../../../config/theme';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { PlaylistList } from '../../components/Playlist/List';
import Spacer from '../../components/Spacer';

const PlaylistScreen: React.FC = ({ route }) => {
  const [modalIsOpen, setToggleModal] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<null | PlaylistType>(null);
  const [fabIsOpen, toggleFab] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const toggleModal = useCallback(
    (item: null | PlaylistType = null): void => {
      if (item?.playlistId) {
        setPlaylist(item);
      }

      setToggleModal(!modalIsOpen);
    },
    [modalIsOpen, setPlaylist]
  );

  return (
    <Layout>
      <Header title="Playlists" backgroundColor={colors.screens.playlists} />
      <Spacer height={18} />
      <PlaylistList />
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
              label: t('fab.newPlaylist'),
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
