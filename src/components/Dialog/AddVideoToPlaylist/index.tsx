import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import {
  Paragraph,
  Dialog,
  Button,
  Portal,
  useTheme,
  TextInput
} from 'react-native-paper';
import { actions, Store } from '../../../store';
import useStore from '../../../hooks/useStore';
import { Video, Playlist } from '../../../types';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import useVideo from '../../../hooks/useVideo';
import { useTranslation } from 'react-i18next';
import usePlaylist from '../../../hooks/usePlaylist';
import { playlistProps } from '../AddPlaylist';
import Spacer from '../../Spacer';

interface Props {
  toggleDialog: () => void;
  visible: boolean;
  video: Video;
  playlists: Playlist[];
}

const DialogAddVideoToPlaylist: React.FC<Props> = ({
  toggleDialog,
  visible,
  video,
  playlists
}) => {
  if (!playlists) {
    return null;
  }

  const { t } = useTranslation();
  const store: Store = useStore();
  const [playlistId, setPlaylistId] = useState<null | string>(null);
  const [playlist, setPlaylist] = useState(playlistProps);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { addVideoToPlaylist } = useVideo();
  const { colors } = useTheme();
  const { createPlaylist } = usePlaylist();

  const EMPTY_VALUE = {
    playlistId: null,
    title: t('dialog.addToPlaylist.selectPlaylist')
  };

  const NEW_VALUE = {
    playlistId: null,
    title: t('dialog.addToPlaylist.newPlaylist')
  };

  const setPlaylistName = (name: string): void =>
    setPlaylist({ ...playlist, title: name });

  const onPress = async (): Promise<void> => {
    const isNewPlaylist = playlistId === null;
    let newPlaylistId = null;

    setLoading(true);

    if (isNewPlaylist) {
      newPlaylistId = uuidv4();

      await createPlaylist(
        {
          ...playlist,
          playlistId: newPlaylistId
        },
        null,
        false
      );
    }

    addVideoToPlaylist(
      isNewPlaylist ? newPlaylistId : playlistId,
      video,
      () => {
        setLoading(false);
        toggleDialog();
        setTimeout(() => setPlaylist(playlistProps), 500);
      }
    );
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog}>
        <Dialog.Title>{t('dialog.addToPlaylist.title')}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{t('dialog.addToPlaylist.text')}</Paragraph>
          <Picker
            selectedValue={playlistId}
            style={{ height: 50, color: colors.text }}
            onValueChange={(value) => setPlaylistId(value)}>
            {[...playlists, NEW_VALUE].map(({ title, playlistId }, index) => (
              <Picker.Item key={index} label={title} value={playlistId} />
            ))}
          </Picker>
          {playlistId === null && (
            <>
              <Spacer height={10} />
              <Paragraph>{t('dialog.addToPlaylist.text2')}</Paragraph>
              <TextInput
                accessibilityStates={[]}
                mode="outlined"
                label={t('dialog.createPlaylist.placeholder')}
                value={playlist.title}
                onChangeText={setPlaylistName}
              />
            </>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={toggleDialog}>{t('common.button.cancel')}</Button>
          <Button
            onPress={onPress}
            loading={isLoading}
            disabled={playlistId === null && playlist.title === ''}>
            {t('common.button.add')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddVideoToPlaylist;
