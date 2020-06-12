// @flow
import React from 'react';
import { Dialog, Button, TextInput } from 'react-native-paper';

interface Props {
  label: string;
  value: string;
  visible: boolean;
  onDismiss: () => void;
  onSubmit: () => void;
}

const DialogEditToken: React.FC<Props> = ({
  label,
  value,
  visible,
  onDismiss,
  onSubmit
}) => (
  <Dialog visible={visible} onDismiss={onDismiss}>
    {/* @ts-ignore */}
    <Dialog.Title>Edit token</Dialog.Title>
    <Dialog.Content>
      <TextInput
        accessibilityStates={[]}
        mode="outlined"
        label={label}
        onChange={() => null}
        value={value}
      />
    </Dialog.Content>
    <Dialog.Actions>
      {/* @ts-ignore */}
      <Button onPress={onDismiss}>Cancel</Button>
      {/* @ts-ignore */}
      <Button onPress={onSubmit}>Submit</Button>
    </Dialog.Actions>
  </Dialog>
);

export default DialogEditToken;
