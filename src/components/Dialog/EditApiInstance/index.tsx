// @flow
import React, { useState } from 'react';
import { Dialog, Button, TextInput } from 'react-native-paper';
import { Picker, View } from '@react-native-community/picker';
import { PUBLIC_INVIDIOUS_INSTANCES } from '../../../constants';

interface Props {
  value: string;
  visible: boolean;
  onDismiss: () => void;
  onSubmit: () => void;
}

const DialogEditApiInstance: React.FC<Props> = ({
  value,
  visible,
  onDismiss,
  onSubmit
}) => {
  const [instance, setInstance] = useState<string>(value);
  const [customInstance, setCustomInstance] = useState<boolean>(false);

  const onValueChange = (value: string): void => {
    if (value === 'other') {
      return setCustomInstance(true);
    }

    return setInstance(value);
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      {/* @ts-ignore */}
      <Dialog.Title>Edit API instance</Dialog.Title>
      <Dialog.Content>
        <Picker selectedValue={instance} onValueChange={onValueChange}>
          {PUBLIC_INVIDIOUS_INSTANCES.map(({ value, label }, index) => (
            <Picker.Item key={index} label={label} value={value} />
          ))}
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
        </Picker>
      </Dialog.Content>
      <Dialog.Actions>
        {/* @ts-ignore */}
        <Button onPress={onDismiss}>Cancel</Button>
        {/* @ts-ignore */}
        <Button onPress={onSubmit}>Submit</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogEditApiInstance;
