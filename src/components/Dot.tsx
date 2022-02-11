import React, { memo } from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";

import hex2rgba from "../utils/hex2rgba";

interface Props {
  isActive: boolean;
  color: string;
  onPress: () => void;
}

export const Dot: React.FC<Props> = memo(
  ({ isActive, color = "#FFFFFF", onPress }) => {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={{ padding: 10 }}>
          <View
            style={[
              isActive ? styles.active : styles.default,
              {
                backgroundColor: isActive ? color : hex2rgba(color, 0.3),
              },
            ]}
          />
        </View>
      </TouchableNativeFeedback>
    );
  }
);

const styles = StyleSheet.create({
  default: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  active: {
    width: 15,
    height: 15,
    borderRadius: 15,
  },
});
