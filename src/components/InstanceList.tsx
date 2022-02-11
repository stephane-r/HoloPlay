import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { useInvidiousInstances } from "../providers/Instances";
import stripTrailingSlash from "../utils/stripTrailingSlash";
import { Instance } from "./Instance";

const InstanceList: React.FC = memo(() => {
  const { t } = useTranslation();
  const { data, custom } = useInvidiousInstances();

  if (!data) {
    return (
      <View style={styles.containerLoading}>
        <Text>{t("instance.loading")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
  container: {
    flexDirection: "column",
  },
  containerLoading: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

export default InstanceList;
