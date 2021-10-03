import React, { useState } from 'react';
import { Text, Dialog, Button, TextInput } from 'react-native-paper';
import { Alert } from 'react-native';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { actions } from '../../../store';
import fetchPlaylists from '../../../utils/fetchPlaylists';
import { useTranslation } from 'react-i18next';
import Spacer from '../../Spacer';

interface Props {
  label: string;
  value: string;
  visible: boolean;
  onDismiss: () => void;
  toggleDialog: () => void;
}

const DialogEditToken: React.FC<Props> = ({
  label,
  value,
  visible,
  onDismiss,
  toggleDialog
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(value ?? '');

  const onSubmit = async () => {
    setLoading(true);

    if (token === value) {
      return toggleDialog();
    }

    if (token === '') {
      actions.setToken(token);
      return toggleDialog();
    }

    try {
      await callApi({
        url: ApiRoutes.Preferences,
        customToken: token
      });
      await fetchPlaylists();
      toggleDialog();
      return setTimeout(
        () =>
          actions.setSnackbar({
            message: t('flashMessage.importData')
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
      <Dialog.Title>{t('dialog.editToken.title')}</Dialog.Title>
      <Dialog.Content>
        <TextInput
          accessibilityStates={[]}
          mode="outlined"
          label="Token"
          onChangeText={setToken}
          value={token}
        />
        {token === '' && (
          <>
            <Spacer height={15} />
            <Text>{t('dialog.editToken.emptyToken')}</Text>
          </>
        )}
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>{t('common.button.cancel')}</Button>
        <Button onPress={onSubmit} loading={loading}>
          {t('common.button.done')}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogEditToken;
