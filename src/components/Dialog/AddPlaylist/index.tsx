import React, { useState, useEffect } from 'react';
import { Portal, Button, Dialog, TextInput } from 'react-native-paper';
import { Playlist } from '../../../types';
import { useTranslation } from 'react-i18next';
import { usePlaylist } from '../../../providers/Playlist';

interface Props {
  toggleDialog: (value: null | Playlist) => void;
  visible: boolean;
  playlist: Playlist;
}

export const playlistProps = {
  title: '',
  privacy: 'public'
};

const DialogAddPlaylist: React.FC<Props> = ({
  toggleDialog,
  visible,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState(props.playlist ?? playlistProps);
  const { playlist: playlistActions } = usePlaylist();
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
      return alert('TODO');
      // return updatePlaylist(playlist, closeDialog);
    }

    await playlistActions.create(playlist.title);

    return closeDialog();
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
