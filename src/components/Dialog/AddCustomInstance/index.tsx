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
import Spacer from '../../Spacer';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

const DialogAddCustomInstance: React.FC<Props> = ({ visible, onDismiss }) => {
  const store = useStore();
  const [uri, setUri] = useState<string>('https://');
  const { t } = useTranslation();

  const IS_NOT_VALID_URI = !/(http(s?)):\/\//i.test(uri);

  const onValueChange = (value: string): void => setUri(true);

  const submit = async () => {
    try {
      actions.setCustomInstance({
        isCustom: true,
        uri
      });

      return setTimeout(
        () =>
          actions.setFlashMessage({
            message: t('flashMessage.addCustomInstanceSuccess')
          }),
        500
      );
    } catch (error) {
      return setTimeout(
        () =>
          actions.setFlashMessage({
            message: t('flashMessage.invidiousInstanceTokenUpdated')
          }),
        500
      );
    } finally {
      onDismiss();
    }
  };

  return (
    <Dialog
      visible={visible}
      onDismiss={() => {
        setUri(null);
        onDismiss();
      }}>
      <Dialog.Title>{t('dialog.customInstance.title')}</Dialog.Title>
      <Dialog.Content>
        <Text>
          {t('dialog.customInstance.example')} :{' '}
          <Text style={{ fontWeight: 'bold' }}>
            https://my-custom-invidious.com
          </Text>
        </Text>
        <Spacer height={20} />
        <TextInput
          accessibilityStates={[]}
          mode="outlined"
          label={t('dialog.customInstance.placeholder')}
          value={uri}
          onChangeText={setUri}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>{t('common.button.cancel')}</Button>
        <Button disabled={IS_NOT_VALID_URI} onPress={submit}>
          {t('common.button.done')}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogAddCustomInstance;
