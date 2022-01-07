//
import React, { memo, useCallback, useState } from 'react';
import { Dialog, Button, Portal } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { usePlaylist } from '../../../providers/Playlist';

interface Props {
  toggleDialog: () => void;
  visible: boolean;
  playlistName: string;
}

export const DialogRemovePlaylist: React.FC<Props> = memo(
  ({ toggleDialog, visible, playlist }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { playlist: playlistActions } = usePlaylist();

    const handleSubmit = useCallback(async (): void => {
      setLoading(true);
      await playlistActions.remove(playlist.playlistId);
      setLoading(false);
      toggleDialog();
    }, [playlist, playlistActions, setLoading]);

    return (
      <Portal>
        <Dialog visible={visible} onDismiss={toggleDialog}>
          <Dialog.Title>
            {t('dialog.removePlaylist.title', { name: playlist.title })}
          </Dialog.Title>
          <Dialog.Actions>
            <Button onPress={toggleDialog}>{t('common.button.cancel')}</Button>
            <Button onPress={handleSubmit} loading={loading}>
              {t('common.button.done')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
);
