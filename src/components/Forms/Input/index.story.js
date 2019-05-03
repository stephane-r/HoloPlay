// @flow
import React from 'react';
import { View } from 'react-native';
import Input from '.';

const InputStory = () => (
  <View style={{ padding: 20 }}>
    <Input
      placeholder="Input placeholder"
      onChangeText={value => console.log(value)}
    />
  </View>
);

const InputLabelStory = () => (
  <View style={{ padding: 20 }}>
    <Input
      label="Input label"
      onChangeText={value => console.log(value)} />
  </View>
);

export { InputStory, InputLabelStory };
