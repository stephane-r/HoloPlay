import React, { memo, useState } from 'react';
import { Dialog, Button, TextInput, Portal } from 'react-native-paper';
import { Alert } from 'react-native';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { actions } from '../../../store';
import fetchPlaylists from '../../../utils/fetchPlaylists';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from '../../../providers/Snackbar';
import { useAppSettings } from '../../../providers/App';

interface Props {
  label: string;
  value: string;
  visible: boolean;
  onDismiss: () => void;
}

export const DialogEditUsername: React.FC<Props> = memo(
  ({ label, value, visible, onDismiss }) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(value);
    const { setSettings } = useAppSettings();
    const { t } = useTranslation();
    const snackbar = useSnackbar();

    const onSubmit = () => {
      setLoading(true);

      try {
        setSettings.username(username);
        onDismiss();
        return setTimeout(
          () => snackbar.show(t('snackbar.usernameUpdated')),
          500
        );
      } catch (error) {
        snackbar.show(error.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title>{t('dialog.editUsername.title')}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              accessibilityStates={[]}
              mode="outlined"
              label={label}
              onChangeText={setUsername}
              value={username}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onDismiss}>{t('common.button.cancel')}</Button>
            <Button
              onPress={onSubmit}
              loading={loading}
              disabled={username === ''}>
              {t('common.button.done')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
);
