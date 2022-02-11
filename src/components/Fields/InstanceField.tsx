import { Picker } from "@react-native-community/picker";
import React, { memo, useState } from "react";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

import { useInvidiousInstances } from "../../providers/Instances";

export const InstanceField: React.FC = memo(({ value, onChange }) => {
  const { data } = useInvidiousInstances();
  const { colors } = useTheme();

  return (
    <View style={styles.picker}>
      <Picker
        style={{ color: colors.text }}
        selectedValue={value}
        onValueChange={onChange}
      >
        {data.map(({ uri, monitor }) => (
          <Picker.Item key={uri} label={monitor?.name ?? uri} value={uri} />
        ))}
      </Picker>
    </View>
  );
});

const styles = StyleSheet.create({
  picker: {
    height: 55,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, .5)",
    borderRadius: 4,
    paddingLeft: 5,
  },
});
