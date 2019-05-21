// @flow
import React from 'react';
import { View } from 'react-native';
import Button from '.';

const ButtonStory = () => (
  <View style={{ padding: 16 }}>
    <Button
      title="Button label"
      onPress={() => console.log('on press props !')}
    />
  </View>
);

export default ButtonStory;
