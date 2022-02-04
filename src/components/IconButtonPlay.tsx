import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

interface IconButtonPlayProps {
  onPress: () => void;
  disabled: boolean;
}

export const IconButtonPlay: React.FC<IconButtonPlayProps> = memo(
  ({ onPress, disabled }) => {
    return (
      <IconButton
        disabled={disabled}
        icon="play-circle-outline"
        size={35}
        style={styles.button}
        onPress={onPress}
      />
    );
  }
);

const styles = StyleSheet.create({
  button: {
    width: 40,
    marginRight: 16,
  },
});
