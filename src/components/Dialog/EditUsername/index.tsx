import React, { memo, useState } from 'react';
import { Dialog, Button, TextInput, Portal } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from '../../../providers/Snackbar';
import { useAppSettings } from '../../../providers/App';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export const DialogEditUsername: React.FC<Props> = memo(
  ({ visible, onDismiss }) => {
    const { settings, setSettings } = useAppSettings();
    const [username, setUsername] = useState(settings.username);
    const { t } = useTranslation();
    const snackbar = useSnackbar();

    const onSubmit = () => {
      try {
        setSettings.username(username);
        onDismiss();
        return setTimeout(
          () => snackbar.show(t('snackbar.usernameUpdated')),
          500
        );
      } catch (error) {
        snackbar.show(error.message);
      }
    };

    return (
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title>{t('dialog.editUsername.title')}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              onChangeText={setUsername}
              value={username}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onDismiss}>{t('common.button.cancel')}</Button>
            <Button
              onPress={onSubmit}
              disabled={username === ''}>
              {t('common.button.done')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
);
