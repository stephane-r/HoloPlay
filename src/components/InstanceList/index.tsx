import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { useInvidiousInstances } from "../../containers/InstanceList";
import { CustomInstance } from "../../types";
import stripTrailingSlash from "../../utils/stripTrailingSlash";
import { Instance } from "../Instance";

interface Props {
  customInstances: CustomInstance[];
}

const InstanceList: React.FC<Props> = memo(() => {
  const { t } = useTranslation();
  const { data, custom } = useInvidiousInstances();

  if (!data) {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
      >
        <Text>{t("instance.loading")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <View>
        {[...custom, ...data].map(({ uri, isCustom }) => (
          <Instance
            key={uri}
            uri={stripTrailingSlash(uri)}
            isCustom={isCustom}
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
  },
});

export default InstanceList;
