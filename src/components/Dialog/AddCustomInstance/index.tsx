import React, { memo, useState } from 'react';
import {
  Dialog,
  Button,
  TextInput,
  useTheme,
  Text,
  Portal
} from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { ApiRoutes } from '../../../constants';
import { View, Alert } from 'react-native';
import { actions } from '../../../store';
import fetchPlaylists from '../../../utils/fetchPlaylists';
import callApi from '../../../utils/callApi';
import useInvidiousInstances from '../../../hooks/useInvidiousInstances';
import { useTranslation } from 'react-i18next';
import stripTrailingSlash from '../../../utils/stripTrailingSlash';
import Spacer from '../../Spacer';
import { useAppSettings } from '../../../providers/App';
import { useSnackbar } from '../../../providers/Snackbar';
import { useCallback } from 'react';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export const DialogAddCustomInstance: React.FC<Props> = memo(
  ({ visible, onDismiss }) => {
    const [uri, setUri] = useState<string>('https://');
    const { t } = useTranslation();
    const { setSettings } = useAppSettings();
    const snackbar = useSnackbar();

    const IS_NOT_VALID_URI = !/(http(s?)):\/\//i.test(uri);
    const onValueChange = (value: string): void => setUri(true);

    const onSubmit = useCallback(async () => {
      try {
        setSettings.customInstance({
          isCustom: true,
          uri
        });

        setTimeout(
          () => snackbar.show(t('snackbar.addCustomInstanceSuccess')),
          500
        );
      } catch (error) {
        setTimeout(
          () => snackbar.show(t('snackbar.invidiousInstanceTokenUpdated')),
          500
        );
      } finally {
        onDismiss();
      }
    }, [uri, onDismiss, setSettings, snackbar, t]);

    return (
      <Portal>
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
            <Button disabled={IS_NOT_VALID_URI} onPress={onSubmit}>
              {t('common.button.done')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
);
