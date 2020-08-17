import React, { useState } from 'react';
import { Dialog, Button, TextInput, Text, Checkbox } from 'react-native-paper';
import { View, TouchableNativeFeedback } from 'react-native';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { actions } from '../../../store';
import fetchPlaylists from '../../../utils/fetchPlaylists';
import Spacer from '../../Spacer';

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

  const onSubmit = () => {
    setLoading(true);

    try {
      actions.setSendErrorMonitoring(checked);
      toggleDialog();
      return setTimeout(
        () =>
          actions.setFlashMessage({
            message: 'Monitoring setting is updated'
          }),
        500
      );
    } catch (error) {
      console.log(error);
      actions.setFlashMessage({
        message: 'Error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Monitoring</Dialog.Title>
      <Dialog.Content>
        <Text>
          HoloPlay includes an error and performance monitoring tool that is
          disabled by default. No data is retrieved without your consent.
        </Text>
        <Spacer height={10} />
        <Text>
          By activating it, any errors will be sent to a self-hosted instance of
          Sentry.
        </Text>
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
            <Text>Send Error and Performance Monitoring</Text>
          </View>
        </TouchableNativeFeedback>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={onSubmit} loading={loading}>
          Submit
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogErrorMonitoring;
