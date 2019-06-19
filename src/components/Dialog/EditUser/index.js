// @flow
import React from 'react';
import { Dialog, Button, TextInput } from 'react-native-paper';

type DialogEditUserEmailProps = {
  title: string,
  label: string,
  value: string,
  visible: boolean,
  onDismiss: Function,
  onSubmit: Function
};

const DialogEditUserEmail = ({
  title,
  label,
  value,
  visible,
  onDismiss,
  onSubmit
}: DialogEditUserEmailProps) => (
  <Dialog
    visible={visible}
    onDismiss={onDismiss}>
    <Dialog.Title>{title}</Dialog.Title>
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

export default DialogEditUserEmail;
