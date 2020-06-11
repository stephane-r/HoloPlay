// @flow
import React from 'react';
import { Dialog, Button, TextInput } from 'react-native-paper';

type DialogEditTokenProps = {
  label: string,
  value: string,
  visible: boolean,
  onDismiss: Function,
  onSubmit: Function
};

const DialogEditToken = ({
  label,
  value,
  visible,
  onDismiss,
  onSubmit
}: DialogEditTokenProps) => (
  <Dialog visible={visible} onDismiss={onDismiss}>
    <Dialog.Title>Edit token</Dialog.Title>
    <Dialog.Content>
      <TextInput
        mode="outlined"
        label={label}
        onChange={() => null}
        value={value}
      />
    </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={onDismiss}>Cancel</Button>
      <Button onPress={onSubmit}>Submit</Button>
    </Dialog.Actions>
  </Dialog>
);

export default DialogEditToken;
