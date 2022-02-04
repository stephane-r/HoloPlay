import React, { memo } from "react";
import { View } from "react-native";

interface Props {
  width?: number;
  height?: number;
}

export const Spacer: React.FC<Props> = memo(({ width = 0, height = 0 }) => (
  <View style={{ width, height }} />
));
