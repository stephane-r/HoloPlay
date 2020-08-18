import React, { useState } from 'react';
import { Dialog, Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { ApiRoutes } from '../../../constants';
import { View } from 'react-native';
import { actions } from '../../../store';
import fetchPlaylists from '../../../utils/fetchPlaylists';
import callApi from '../../../utils/callApi';
import useInvidiousInstances from '../../../hooks/useInvidiousInstances';

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
  const [instance, setInstance] = useState<string>(value);
  const [isLoading, setIsLoading] = useState<string>(false);
  const [customInstance, setCustomInstance] = useState<boolean>(false);
  const { instances } = useInvidiousInstances();

  const onValueChange = (value: string): void => {
    if (value === 'other') {
      return setCustomInstance(true);
    }

    return setInstance(value);
  };

  const submit = async () => {
    setIsLoading(true);

    try {
      await actions.setInstance(instance);
      actions.clearData();
      await callApi({
        url: ApiRoutes.Preferences
      });
      await fetchPlaylists();
      toggleDialog();

      return setTimeout(
        () =>
          actions.setFlashMessage({
            message: 'Invidous instance updated. Playlists are updated.'
          }),
        500
      );
    } catch (error) {
      console.log(error);
      actions.clearData();
      return setTimeout(
        () =>
          actions.setFlashMessage({
            message: 'Invidous instance updated. Consider changing your token.'
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
      <Dialog.Title>Edit API instance</Dialog.Title>
      <Dialog.Content>
        <Picker selectedValue={instance} onValueChange={onValueChange}>
          {instances.map(({ uri, monitor }) => (
            <Picker.Item key={uri} label={monitor?.name ?? uri} value={uri} />
          ))}
        </Picker>
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
        <Button onPress={onDismiss}>Cancel</Button>
        <Button loading={isLoading} onPress={submit}>
          Submit
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogEditApiInstance;
