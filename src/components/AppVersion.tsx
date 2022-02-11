import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { List, Text } from "react-native-paper";

import { version } from "../../package";

interface Props {
  listItemStyle?: boolean;
}

export const AppVersion: React.FC<Props> = ({ listItemStyle }) => {
  const { t } = useTranslation();

  if (listItemStyle) {
    return <List.Item title={t("drawler.version")} description={version} />;
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 16,
        }}
      >
        <Text>
          {t("drawler.version")} {version}
        </Text>
      </View>
    </View>
  );
};
