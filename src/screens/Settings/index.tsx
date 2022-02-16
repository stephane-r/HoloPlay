import {
  NavigationHelpersCommon,
  useNavigation,
} from "@react-navigation/native";
import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Appbar,
  Button,
  Divider,
  IconButton,
  List,
  Menu,
  Subheading,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";

import { AppVersion } from "../../components/AppVersion";
import { DialogEditToken } from "../../components/Dialog/EditToken";
import { DialogEditUsername } from "../../components/Dialog/EditUsername";
import { Spacer } from "../../components/Spacer";
import useBackup from "../../hooks/useBackup";
import useUpdateRelease from "../../hooks/useUpdateRelease";
import { APP_LANGUAGES } from "../../i18n";
import { useAppSettings } from "../../providers/App";
import { useSnackbar } from "../../providers/Snackbar";

interface Props {
  navigation: NavigationHelpersCommon;
}

const DEVICE_HEIGHT = Dimensions.get("window").height;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { backupData, importData } = useBackup();

  return (
    <ScrollView
      style={{
        backgroundColor: colors.background,
      }}
    >
      <View style={[styles.container, { minHeight: DEVICE_HEIGHT }]}>
        <Appbar>
          <Appbar.BackAction
            icon="archive"
            onPress={(): void => navigation.goBack()}
          />
          <Appbar.Content title={t("settings.title")} />
        </Appbar>
        <View style={styles.content}>
          <Subheading style={styles.subheading}>{t("settings.api")}</Subheading>
          <Instance />
          <Divider />
          <Token />
          <Divider />
        </View>
        <View style={styles.content}>
          <Subheading style={styles.subheading}>
            {t("settings.application")}
          </Subheading>
          <Username />
          <Divider />
          <Language />
          <Divider />
          <ErrorMonitoring />
          <Divider />
          <DarkMode />
          <Divider />
          <View>
            <Version />
          </View>
          <Divider />
        </View>
        <View style={styles.content}>
          <Subheading style={styles.subheading}>
            {t("settings.data")}
          </Subheading>
          <View style={{ height: 15 }} />
          <View
            style={{
              paddingHorizontal: 15,
            }}
          >
            <Text>{t("settings.importExportText")}</Text>
          </View>
          <View style={{ height: 15 }} />
          <View
            style={{
              paddingHorizontal: 9,
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Button
              style={{ flex: 1, marginHorizontal: 7 }}
              mode="contained"
              onPress={backupData}
            >
              {t("settings.exportButton")}
            </Button>
            <Button
              style={{ flex: 1, marginHorizontal: 7 }}
              mode="contained"
              onPress={importData}
            >
              {t("settings.importButton")}
            </Button>
          </View>
        </View>
        <View style={{ height: 25 }} />
        <Divider />
        <View style={styles.content}>
          <Subheading style={styles.subheading}>
            {t("drawler.privacyPolicy").toUpperCase()}
          </Subheading>
          <View style={{ height: 15 }} />
          <PrivacyPolicy />
        </View>
      </View>
      <Spacer height={20} />
    </ScrollView>
  );
};

const PrivacyPolicy = memo(() => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingHorizontal: 15,
      }}
    >
      <Button
        style={{ flex: 1 }}
        mode="contained"
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        View
      </Button>
    </View>
  );
});

const Instance = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { settings } = useAppSettings();

  return (
    <View style={{ flexDirection: "row", paddingRight: 16 }}>
      <View style={{ flex: 1 }}>
        <List.Item
          title={t("settings.invidiousInstance")}
          description={settings.instance}
          onPress={() => navigation.navigate("InvidiousInstances")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          mode="contained"
          onPress={() => navigation.navigate("InvidiousInstances")}
        >
          {t("settings.buttonUpdateInvidiousInstance")}
        </Button>
      </View>
    </View>
  );
});

const Token = memo(() => {
  const { t } = useTranslation();
  const { settings } = useAppSettings();
  const [visible, setVisible] = useState(false);
  const toggleDialog = useCallback(
    () => setVisible(!visible),
    [visible, setVisible]
  );

  return (
    <>
      <List.Item
        title={t("settings.token")}
        description={settings.token ?? t("settings.tokenEmpty")}
        onPress={toggleDialog}
      />
      <DialogEditToken
        token={settings.token}
        visible={visible}
        onDismiss={toggleDialog}
      />
    </>
  );
});

const Username = memo(() => {
  const { t } = useTranslation();
  const { settings } = useAppSettings();
  const [visible, setVisible] = useState(false);
  const toggleDialog = useCallback(
    () => setVisible(!visible),
    [visible, setVisible]
  );

  return (
    <>
      <List.Item
        title={t("settings.username")}
        description={settings.username}
        onPress={toggleDialog}
      />
      <DialogEditUsername visible={visible} onDismiss={toggleDialog} />
    </>
  );
});

const Language = memo(() => {
  const { t } = useTranslation();
  const { settings, setSettings } = useAppSettings();
  const [visible, setVisible] = useState(false);

  const openMenu = useCallback(() => setVisible(true), [setVisible]);
  const closeMenu = useCallback(() => setVisible(false), [setVisible]);

  return (
    <View style={{ flexDirection: "row", paddingRight: 16 }}>
      <View style={{ flex: 1 }}>
        <List.Item
          title={t("settings.language")}
          description={APP_LANGUAGES[settings.language]}
          onPress={openMenu}
        />
      </View>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="dots-vertical"
              size={20}
              onPress={openMenu}
              style={{ marginHorizontal: 0 }}
            />
          }
        >
          {Object.entries(APP_LANGUAGES).map(([key, name]) => (
            <Menu.Item onPress={() => setSettings.language(key)} title={name} />
          ))}
        </Menu>
      </View>
    </View>
  );
});

const ErrorMonitoring = memo(() => {
  const { t } = useTranslation();
  const { settings, setSettings } = useAppSettings();
  const [sendErrorMonitoring, setSendErrorMonitoring] = useState(
    settings.sendErrorMonitoring
  );
  const snackbar = useSnackbar();

  const toggleErrorMonitoring = useCallback(() => {
    try {
      setSendErrorMonitoring(!sendErrorMonitoring);
      setSettings.sendErrorMonitoring(!sendErrorMonitoring);
    } catch (error) {
      snackbar.show(error.message);
    }
  }, [sendErrorMonitoring, setSendErrorMonitoring, setSettings, snackbar]);

  return (
    <View style={{ flexDirection: "row", paddingRight: 16 }}>
      <View style={{ flex: 1 }}>
        <List.Item
          title={t("settings.monitoring")}
          description={t("dialog.monitoring.text")}
          onPress={() => toggleErrorMonitoring()}
        />
      </View>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Switch
          value={sendErrorMonitoring}
          onValueChange={() => toggleErrorMonitoring()}
        />
      </View>
    </View>
  );
});

const DarkMode = memo(() => {
  const { t } = useTranslation();
  const { settings, setSettings } = useAppSettings();
  const [darkMode, setDarkMode] = useState(settings.darkMode);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
    setSettings.darkMode(!darkMode);
  }, [setDarkMode, darkMode]);

  return (
    <View style={{ flexDirection: "row", paddingRight: 16 }}>
      <View style={{ flex: 1 }}>
        <List.Item
          title={t("settings.darkMode")}
          onPress={() => toggleDarkMode()}
        />
      </View>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Switch value={darkMode} onValueChange={() => toggleDarkMode()} />
      </View>
    </View>
  );
});

const Version = memo(() => {
  const { t } = useTranslation();
  const { settings, setSettings } = useAppSettings();
  const { updateAvailable, downloadApk } = useUpdateRelease();

  return (
    <View style={{ flexDirection: "row", paddingRight: 16 }}>
      <View style={{ flex: 1 }}>
        <AppVersion listItemStyle />
      </View>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {updateAvailable ? (
          <Button mode="contained" onPress={downloadApk}>
            {t("snackbar.buttonUpdateAvailable")}
          </Button>
        ) : null}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: "column",
  },
  switchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
  },
  switchContainer2: { flexDirection: "row", paddingRight: 16 },
  subheading: {
    fontWeight: "bold",
    padding: 16,
    paddingBottom: 0,
  },
});

export default SettingsScreen;
