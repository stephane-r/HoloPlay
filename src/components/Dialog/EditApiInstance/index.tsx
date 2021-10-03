import React, { useState } from 'react';
import { Dialog, Button, TextInput, useTheme, Text } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { ApiRoutes } from '../../../constants';
import { View, Alert } from 'react-native';
import { actions } from '../../../store';
import fetchPlaylists from '../../../utils/fetchPlaylists';
import callApi from '../../../utils/callApi';
import useInvidiousInstances from '../../../hooks/useInvidiousInstances';
import { useTranslation } from 'react-i18next';
import useStore from '../../../hooks/useStore';
import stripTrailingSlash from '../../../utils/stripTrailingSlash';

interface Props {
  value: string;
  visible: boolean;
  onDismiss: () => void;
  toggleDialog: () => void;
}

const DialogEditApiInstance: React.FC<Props> = ({
  value,
  visible,
  onDismiss,
  toggleDialog
}) => {
  const store = useStore();
  const [instance, setInstance] = useState<string>(value);
  const [isLoading, setIsLoading] = useState<string>(false);
  const [customInstance, setCustomInstance] = useState<boolean>(false);
  const { instances, loading } = useInvidiousInstances();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const onValueChange = (value: string): void => {
    if (value === 'other') {
      return setCustomInstance(true);
    }

    return setInstance(stripTrailingSlash(value));
  };

  const submit = async () => {
    setIsLoading(true);

    if (instance === value) {
      toggleDialog();
      return setIsLoading(false);
    }

    try {
      await actions.setInstance(instance);

      if (!store.logoutMode) {
        await callApi({
          url: ApiRoutes.Preferences
        });
        actions.clearData();
        await fetchPlaylists();
      }

      return setTimeout(
        () =>
          actions.setSnackbar({
            message: t('flashMessage.invidiousInstanceUpdated')
          }),
        500
      );
    } catch (error) {
      console.log(error);

      if (!store.logoutMode) {
        actions.clearData();
      }

      return setTimeout(
        () =>
          actions.setSnackbar({
            message: t('flashMessage.invidiousInstanceTokenUpdated')
          }),
        500
      );
    } finally {
      toggleDialog();
      setIsLoading(false);
    }
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>{t('dialog.editApiInstance.title')}</Dialog.Title>
      <Dialog.Content>
        {loading ? (
          <Text>Loading instances...</Text>
        ) : (
          <Picker
            style={{ color: colors.text }}
            selectedValue={instance}
            onValueChange={onValueChange}>
            {instances.map(({ uri, monitor }) => (
              <Picker.Item key={uri} label={monitor?.name ?? uri} value={uri} />
            ))}
          </Picker>
        )}
        <View>
          {customInstance && (
            <TextInput
              accessibilityStates={[]}
              mode="outlined"
              label="Instance"
              value={instance}
              onChangeText={setInstance}
            />
          )}
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>{t('common.button.cancel')}</Button>
        <Button loading={isLoading} onPress={submit}>
          {t('common.button.done')}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogEditApiInstance;
