import React, { useState, useEffect } from 'react';
import { Portal, Button, Dialog, TextInput } from 'react-native-paper';
import { actions } from '../../../store';
import useStore from '../../../hooks/useStore';
import { Playlist } from '../../../types';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import { Alert } from 'react-native';
import usePlaylist from '../../../hooks/usePlaylist';
import { useTranslation } from 'react-i18next';

interface Props {
  toggleDialog: (value: null | Playlist) => void;
  visible: boolean;
  playlist: Playlist;
}

const playlistProps = {
  title: '',
  privacy: 'public'
};

const DialogAddPlaylist: React.FC<Props> = ({
  toggleDialog,
  visible,
  ...props
}) => {
  const store = useStore();
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState(props.playlist ?? playlistProps);
  const { createPlaylist, updatePlaylist } = usePlaylist();
  const { t } = useTranslation();

  useEffect(() => {
    if (props.playlist) {
      setPlaylist(props.playlist);
    }
  }, [props.playlist]);

  const setPlaylistName = (name: string): void =>
    setPlaylist({ ...playlist, title: name });

  const submit = async (): Promise<any> => {
    setLoading(true);

    if (playlist.playlistId) {
      return updatePlaylist(playlist, closeDialog);
    }

    return createPlaylist(playlist, closeDialog);
  };

  const closeDialog = (): void => {
    setLoading(false);
    toggleDialog(null);
    setTimeout(() => setPlaylist(playlistProps), 600);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeDialog}>
        <Dialog.Title>
          {t(
            playlist?.playlistId
              ? 'dialog.createPlaylist.titleUpdate'
              : 'dialog.createPlaylist.titleAdd'
          )}
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            accessibilityStates={[]}
            mode="outlined"
            label={t('dialog.createPlaylist.placeholder')}
            value={playlist.title}
            onChangeText={setPlaylistName}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeDialog}>{t('common.button.cancel')}</Button>
          <Button
            onPress={submit}
            loading={loading}
            disabled={playlist.title === ''}>
            {t('common.button.done')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddPlaylist;
