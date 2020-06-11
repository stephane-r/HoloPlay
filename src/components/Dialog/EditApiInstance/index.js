// @flow
import React, { useState } from 'react';
import { Dialog, Button, TextInput } from 'react-native-paper';
import { Picker, View } from 'react-native';
import { PUBLIC_INVIDIOUS_INSTANCES } from '../../../screens/Login/form';

type DialogEditApiInstanceProps = {
  value: string,
  visible: boolean,
  onDismiss: Function,
  onSubmit: Function
};

const DialogEditApiInstance = ({
  value,
  visible,
  onDismiss,
  onSubmit
}: DialogEditApiInstanceProps) => {
  const [instance, setInstance] = useState(value);
  const [customInstance, setCustomInstance] = useState(false);

  const onValueChange = value => {
    if (value === 'other') {
      return setCustomInstance(true);
    }

    return setInstance(value);
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Edit API instance</Dialog.Title>
      <Dialog.Content>
        <Picker selectedValue={instance} onValueChange={onValueChange}>
          {PUBLIC_INVIDIOUS_INSTANCES.map(({ value, label }, index) => (
            <Picker.Item key={index} label={label} value={value} />
          ))}
          <View>
            {customInstance && (
              <TextInput
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
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={onSubmit}>Submit</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogEditApiInstance;
