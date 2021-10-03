import React, { useState } from 'react';
import { Dialog, Button, TextInput, Text, Checkbox } from 'react-native-paper';
import { View, TouchableNativeFeedback } from 'react-native';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { actions } from '../../../store';
import fetchPlaylists from '../../../utils/fetchPlaylists';
import Spacer from '../../Spacer';
import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
  value: string;
  visible: boolean;
  onDismiss: () => void;
  toggleDialog: () => void;
}

const DialogErrorMonitoring: React.FC<Props> = ({
  label,
  value,
  visible,
  onDismiss,
  toggleDialog
}) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState(value);
  const { t } = useTranslation();

  const onSubmit = () => {
    setLoading(true);

    try {
      actions.setSendErrorMonitoring(checked);
      toggleDialog();
      return setTimeout(
        () =>
          actions.setSnackbar({
            message: t('snackbar.monitoringSettingsUpdated')
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
      <Dialog.Title>{t('dialog.monitoring.title')}</Dialog.Title>
      <Dialog.Content>
        <Text>{t('dialog.monitoring.text1')}</Text>
        <Spacer height={10} />
        <Text>{t('dialog.monitoring.text2')}</Text>
        <Spacer height={10} />
        <TouchableNativeFeedback onPress={() => setChecked(!checked)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              transform: [
                {
                  translateX: -8
                }
              ]
            }}>
            <Checkbox status={checked ? 'checked' : 'unchecked'} />
            <Text>{t('dialog.monitoring.label')}</Text>
          </View>
        </TouchableNativeFeedback>
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

export default DialogErrorMonitoring;
