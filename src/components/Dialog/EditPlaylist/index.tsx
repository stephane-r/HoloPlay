import React, { useState, useCallback, memo } from 'react';
import { Portal, Button, Dialog, TextInput } from 'react-native-paper';
import { Playlist } from '../../../types';
import { useTranslation } from 'react-i18next';
import { usePlaylist } from '../../../providers/Playlist';

interface Props {
  toggleDialog: (value: null | Playlist) => void;
  visible: boolean;
  playlist: Playlist;
}

export const DialogEditPlaylist: React.FC<Props> = memo(
  ({ toggleDialog, visible, playlist: initialPlaylist }) => {
    const [loading, setLoading] = useState(false);
    const [playlist, setPlaylist] = useState(initialPlaylist);
    const { playlist: playlistActions } = usePlaylist();
    const { t } = useTranslation();

    const setPlaylistTitle = useCallback(
      (title: string): void => setPlaylist({ ...playlist, title }),
      [playlist]
    );

    const handleSubmit = useCallback(async (): void => {
      setLoading(true);
      await playlistActions.update(playlist);
      setLoading(false);
      toggleDialog();
    }, [playlist, playlistActions, setLoading]);

    return (
      <Portal>
        <Dialog visible={visible} onDismiss={toggleDialog}>
          <Dialog.Title>{t('dialog.createPlaylist.titleUpdate')}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              accessibilityStates={[]}
              mode="outlined"
              label={t('dialog.createPlaylist.placeholder')}
              value={playlist.title}
              onChangeText={setPlaylistTitle}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={toggleDialog}>{t('common.button.cancel')}</Button>
            <Button
              onPress={handleSubmit}
              loading={loading}
              disabled={playlist.title === ''}>
              {t('common.button.done')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
);
