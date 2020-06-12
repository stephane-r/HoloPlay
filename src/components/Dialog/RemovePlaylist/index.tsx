// @flow
import React from 'react';
import { Dialog, Button, Portal } from 'react-native-paper';

interface Props {
  toggleDialog: () => void;
  onPress: () => void;
  visible: boolean;
  playlistName: string;
  loading: boolean;
}

const DialogRemovePlaylist: React.FC<Props> = ({
  toggleDialog,
  visible,
  onPress,
  playlistName,
  loading
}) => (
  <Portal>
    <Dialog visible={visible} onDismiss={toggleDialog}>
      {/* @ts-ignore */}
      <Dialog.Title>Remove {playlistName} playlist ?</Dialog.Title>
      <Dialog.Actions>
        {/* @ts-ignore */}
        <Button onPress={toggleDialog}>Cancel</Button>
        {/* @ts-ignore */}
        <Button onPress={onPress} loading={loading}>
          Remove
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default DialogRemovePlaylist;
