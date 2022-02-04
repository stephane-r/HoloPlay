import React, { useState } from 'react';
import { Text, Dialog, Button, TextInput, Portal } from 'react-native-paper';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import fetchPlaylists from '../../../utils/fetchPlaylists';
import { useTranslation } from 'react-i18next';
import Spacer from '../../Spacer';
import { useSnackbar } from '../../../providers/Snackbar';

interface Props {
  value: string;
  visible: boolean;
  onDismiss: () => void;
}

const DialogEditToken: React.FC<Props> = ({
  value,
  visible,
  onDismiss
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(value ?? '');
  const snackbar = useSnackbar();

  const onSubmit = async () => {
    setLoading(true);

    if (token === value) {
      return onDismiss();
    }

    if (token === '') {
      // actions.setToken(token);
      return onDismiss();
    }

    try {
      await callApi({
        url: ApiRoutes.Preferences,
        customToken: token
      });
      await fetchPlaylists();
      onDismiss();
      return setTimeout(
        () =>
          snackbar.show(t('snackbar.importData')),
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
    </Portal>
  );
};

export default DialogEditToken;
