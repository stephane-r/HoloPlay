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

const DialogEditUsername: React.FC<Props> = ({
  label,
  value,
  visible,
  onDismiss,
  toggleDialog
}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(value);

  const onSubmit = () => {
    if (username !== '') {
      setLoading(true);

      try {
        actions.setUsername(username);
        toggleDialog();
        return setTimeout(
          () => actions.setFlashMessage('Your username is updated.'),
          500
        );
      } catch (error) {
        console.log(error);
        actions.setFlashMessage('Error');
      } finally {
        setLoading(false);
      }
    } else {
      actions.setFlashMessage('You can not set empty username.');
    }
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Edit Username</Dialog.Title>
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
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={onSubmit} loading={loading}>
          Submit
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogEditUsername;
