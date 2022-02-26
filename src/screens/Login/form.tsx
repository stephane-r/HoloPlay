import { Picker } from "@react-native-community/picker";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useState } from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import { Button, useTheme } from "react-native-paper";

import { Spacer } from "../../components/Spacer";
import { APP_LANGUAGES } from "../../i18n";
import { useAppSettings } from "../../providers/App";
import { useFavorite } from "../../providers/Favorite";
import { useInvidiousInstances } from "../../providers/Instances";

export const LoginForm: React.FC = memo(() => {
  const { data } = useInvidiousInstances();
  const [instance, setInstance] = useState(data ? data[0].uri : null);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { settings, setSettings } = useAppSettings();
  const navigation = useNavigation();
  const { favorite: favoriteActions } = useFavorite();

  const handleChangeInstance = useCallback((value: string): void => {
    setInstance(value);
  }, []);

  const handleChangeLanguage = useCallback((lang: string): void => {
    setSettings.language(lang);
  }, []);

  const skipLogin = useCallback(async () => {
    await favoriteActions.init();
    await setSettings.skipLogin({ instance });
    navigation.navigate("App");
  }, [instance]);

  if (!data) {
    return null;
  }

  return (
    <>
      <View style={styles.picker} testID="login-form">
        <Picker
          style={{ color: colors.text }}
          selectedValue={settings.language}
          onValueChange={handleChangeLanguage}
        >
          {Object.entries(APP_LANGUAGES).map(([key, name]) => (
            <Picker.Item key={key} label={name} value={key} />
          ))}
        </Picker>
      </View>
      <Spacer height={20} />
      <View style={styles.picker}>
        <Picker
          style={{ color: colors.text }}
          selectedValue={instance}
          onValueChange={handleChangeInstance}
        >
          {data.map(({ uri, monitor }) => (
            <Picker.Item key={uri} label={monitor?.name ?? uri} value={uri} />
          ))}
        </Picker>
      </View>
      <Spacer height={20} />
      <View style={{ justifyContent: "flex-end" }}>
        <Button mode="contained" onPress={skipLogin}>
          {t("login.buttonStart")}
        </Button>
      </View>
    </>
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
