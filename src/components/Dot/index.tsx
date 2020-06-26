import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import hex2rgba from '../../utils/hex2rgba';

interface Props {
  isActive: boolean;
  color: string;
  onPress: () => void;
}

const Dot: React.FC<Props> = ({ isActive, color = '#FFFFFF', onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={{ padding: 10 }}>
      <View
        style={{
          width: isActive ? 15 : 10,
          height: isActive ? 15 : 10,
          backgroundColor: isActive ? color : hex2rgba(color, 0.3),
          borderRadius: isActive ? 15 : 10
        }}
      />
    </View>
  </TouchableNativeFeedback>
);

export default Dot;
