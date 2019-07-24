// @flow
import React from 'react';
import { Dialog, Button, Portal } from 'react-native-paper';

type DialogRemovePlaylistProps = {
  toggleDialog: Function,
  visible: boolean,
  onPress: Function,
  playlistName: string,
  loading: boolean
};

const DialogRemovePlaylist = ({
  toggleDialog,
  visible,
  onPress,
  playlistName,
  loading
}: DialogRemovePlaylistProps) => (
  <Portal>
    <Dialog
      visible={visible}
      onDismiss={toggleDialog}>
      <Dialog.Title>Remove {playlistName} playlist ?</Dialog.Title>
      <Dialog.Actions>
        <Button onPress={toggleDialog}>Cancel</Button>
        <Button
          onPress={onPress}
          loading={loading}>
          Remove
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default DialogRemovePlaylist;
