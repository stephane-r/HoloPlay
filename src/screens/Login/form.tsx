import { Picker } from "@react-native-community/picker";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import { Button, TextInput, useTheme } from "react-native-paper";

import Spacer from "../../components/Spacer";
import { FAVORIS_PLAYLIST_TITLE } from "../../constants";
import { useInvidiousInstances } from "../../containers/InstanceList";
import { APP_LANGUAGES } from "../../i18n";
import { useAppSettings } from "../../providers/App";
import { useFavorite } from "../../providers/Favorite";
import { useSnackbar } from "../../providers/Snackbar";
import fetchPlaylists from "../../utils/fetchPlaylists";
import getLanguageName from "../../utils/getLanguageName";
import stripTrailingSlash from "../../utils/stripTrailingSlash";
import DashboardScreen from "../Dashboard";

export const LoginForm: React.FC = memo(() => {
  const { data } = useInvidiousInstances();
  const [isLoading, setIsLoading] = useState(false);
  const [instance, setInstance] = useState(
    data ? data[0].monitor.name || data[0].uri : null
  );
  const [token, setToken] = useState<null | string>(null);
  const [username, setUsername] = useState<string>("User");
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { settings, setSettings } = useAppSettings();
  const navigation = useNavigation();
  const snackbar = useSnackbar();
  const { favorite: favoriteActions } = useFavorite();

  const handleChangeInstance = useCallback((value: string): void => {
    setInstance(value);
  }, []);

  const handleChangeLanguage = useCallback((lang: string): void => {
    setSettings.language(lang);
  }, []);

  const login = async () => {
    if (!token || token === "") {
      snackbar.show("You must enter a token");
      return;
    }

    try {
      // setIsLoading(true);
      // await Promise.all([
      //   actions.setInstance(instance),
      //   AsyncStorage.setItem('token', token)
      // ]);
      // await fetchPlaylists();
      // actions.setUsername(username);
      // return onSuccess(token);
    } catch (error) {
      snackbar.show(error.message);
    }
  };

  const skipLogin = useCallback(async () => {
    await favoriteActions.init();
    await setSettings.skipLogin({ instance, username });
    navigation.navigate("App");
  }, [instance, setIsLoading]);

  if (!data) {
    return null;
  }

  return (
    <>
      <View style={styles.picker}>
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
      <TextInput
        mode="outlined"
        label={t("login.token")}
        value={token as string}
        onChangeText={setToken}
      />
      <Spacer height={20} />
      <TextInput
        mode="outlined"
        label={t("login.username")}
        value={username}
        onChangeText={setUsername}
      />
      <Spacer height={20} />
      <Button mode="contained" onPress={login} loading={isLoading}>
        {t("login.buttonSaveToken")}
      </Button>
      <Spacer height={20} />
      <View style={{ justifyContent: "flex-end" }}>
        <Button mode="outlined" onPress={skipLogin}>
          {t("login.buttonSkip")}
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
