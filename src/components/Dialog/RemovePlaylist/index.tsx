//
import React from 'react';
import { Dialog, Button, Portal } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface Props {
  toggleDialog: () => void;
  onPress: () => void;
  visible: boolean;
  playlistName: string;
  loading: boolean;
}

const DialogRemovePlaylist: React.FC<Props> = ({
  toggleDialog,
  visible,
  onPress,
  playlistName,
  loading
}) => {
  const { t } = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog}>
        <Dialog.Title>
          {t('dialog.removePlaylist.title', { playlistName })}
        </Dialog.Title>
        <Dialog.Actions>
          <Button onPress={toggleDialog}>{t('common.button.cancel')}</Button>
          <Button onPress={onPress} loading={loading}>
            {t('common.button.done')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogRemovePlaylist;
