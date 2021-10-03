import React, { useState } from 'react';
import { Dialog, Button, TextInput } from 'react-native-paper';
import { Alert } from 'react-native';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { actions } from '../../../store';
import fetchPlaylists from '../../../utils/fetchPlaylists';
import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
  value: string;
  visible: boolean;
  onDismiss: () => void;
  toggleDialog: () => void;
}

const DialogEditUsername: React.FC<Props> = ({
  label,
  value,
  visible,
  onDismiss,
  toggleDialog
}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(value);
  const { t } = useTranslation();

  const onSubmit = () => {
    setLoading(true);

    try {
      actions.setUsername(username);
      toggleDialog();
      return setTimeout(
        () =>
          actions.setSnackbar({
            message: t('snackbar.usernameUpdated')
          }),
        500
      );
    } catch (error) {
      actions.setSnackbar({
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <Button onPress={onSubmit} loading={loading} disabled={username === ''}>
          {t('common.button.done')}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogEditUsername;
