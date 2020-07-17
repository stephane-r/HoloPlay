import React, { useState } from 'react';
import { Dialog, Button, TextInput } from 'react-native-paper';
import { Alert } from 'react-native';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { actions } from '../../../store';
import fetchPlaylists from '../../../utils/fetchPlaylists';

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
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(value ?? 'Token is empty');

  const onSubmit = async () => {
    if (token !== null && token !== '') {
      setLoading(true);

      try {
        await callApi({
          url: ApiRoutes.Preferences,
          customToken: token
        });
        actions.setToken(token);
        actions.clearData();
        await fetchPlaylists();
        toggleDialog();
        return setTimeout(
          () =>
            actions.setFlashMessage('Your playlists and favoris are imported.'),
          500
        );
      } catch (error) {
        console.log(error);
        actions.setFlashMessage('Error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Edit token</Dialog.Title>
      <Dialog.Content>
        <TextInput
          accessibilityStates={[]}
          mode="outlined"
          label={label}
          onChangeText={setToken}
          value={token}
        />
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

export default DialogEditToken;
