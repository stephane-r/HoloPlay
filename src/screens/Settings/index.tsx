import React, { memo, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  Appbar,
  Subheading,
  List,
  Divider,
  Button,
  Text,
  Checkbox,
  useTheme,
  Switch,
  Menu,
  IconButton
} from 'react-native-paper';
import useStore from '../../hooks/useStore';
import useBackup from '../../hooks/useBackup';
import DialogEditToken from '../../components/Dialog/EditToken';
import DialogEditApiInstance from '../../components/Dialog/EditApiInstance';
import { DialogEditUsername } from '../../components/Dialog/EditUsername';
import DialogErrorMonitoring from '../../components/Dialog/ErrorMonitoring';
import DialogLanguage from '../../components/Dialog/Language';
import { useTranslation } from 'react-i18next';
import getLanguageName from '../../utils/getLanguageName';
import { ScrollView } from 'react-native-gesture-handler';
import Spacer from '../../components/Spacer';
import {
  NavigationHelpersCommon,
  useNavigation
} from '@react-navigation/native';
import { actions, connect } from '../../store';
import AppVersion from '../../components/Version';
import { useAppSettings } from '../../providers/App';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useSnackbar } from '../../providers/Snackbar';

interface Props {
  navigation: NavigationHelpersCommon;
}

const DEVICE_HEIGHT = Dimensions.get('window').height;

const SettingsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const store = useStore();
  const { colors } = useTheme();
  const { backupData, importData } = useBackup();

  return (
    <ScrollView
      style={{
        backgroundColor: colors.background
      }}>
      <View style={[styles.container, { minHeight: DEVICE_HEIGHT }]}>
        <Appbar accessibilityStates={[]}>
          <Appbar.BackAction
            accessibilityStates={[]}
            icon="archive"
            onPress={(): void => navigation.goBack()}
          />
          <Appbar.Content
            title={t('settings.title')}
            accessibilityStates={[]}
          />
        </Appbar>
        <View style={styles.content}>
          <Subheading style={styles.subheading}>{t('settings.api')}</Subheading>
          <Instance />
          <Divider accessibilityStates={[]} />
          <Token />
          <Divider accessibilityStates={[]} />
        </View>
        <View style={styles.content}>
          <Subheading style={styles.subheading}>
            {t('settings.application')}
          </Subheading>
          <Username />
          <Divider accessibilityStates={[]} />
          <Language />
          <Divider accessibilityStates={[]} />
          <ErrorMonitoring />
          <Divider accessibilityStates={[]} />
          <DarkMode />
          <Divider accessibilityStates={[]} />
          <View>
            <AppVersion />
          </View>
          <Divider accessibilityStates={[]} />
        </View>
        <View style={styles.content}>
          <Subheading style={styles.subheading}>
            {t('settings.data')}
          </Subheading>
          <View style={{ height: 15 }} />
          <View
            style={{
              paddingHorizontal: 15
            }}>
            <Text>{t('settings.importExportText')}</Text>
          </View>
          <View style={{ height: 15 }} />
          <View
            style={{
              paddingHorizontal: 9,
              flexDirection: 'row',
              width: '100%'
            }}>
            <Button
              style={{ flex: 1, marginHorizontal: 7 }}
              mode="contained"
              onPress={backupData}>
              {t('settings.exportButton')}
            </Button>
            <Button
              style={{ flex: 1, marginHorizontal: 7 }}
              mode="contained"
              onPress={importData}>
              {t('settings.importButton')}
            </Button>
          </View>
        </View>
      </View>
      <Spacer height={20} />
    </ScrollView>
  );
};

const Instance = memo(() => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { settings, setSettings } = useAppSettings();

  return (
    <View style={{ flexDirection: 'row', paddingRight: 16 }}>
      <View style={{ flex: 1 }}>
        <List.Item
          accessibilityStates={[]}
          title={t('settings.invidiousInstance')}
          description={settings.instance}
          onPress={() => navigation.navigate('InvidiousInstances')}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('InvidiousInstances')}>
          {t('settings.buttonUpdateInvidiousInstance')}
        </Button>
      </View>
    </View>
  );
});

const Token = memo(() => {
  const { t } = useTranslation();
  const { settings, setSettings } = useAppSettings();
  const [visible, setVisible] = useState(false);
  const toggleDialog = useCallback(
    () => setVisible(!visible),
    [visible, setVisible]
  );

  return (
    <>
      <List.Item
        title={t('settings.token')}
        description={settings.token ?? t('settings.tokenEmpty')}
        onPress={toggleDialog}
      />
      <DialogEditToken
        value={settings.token}
        visible={visible}
        onDismiss={toggleDialog}
      />
    </>
  );
});

const Username = memo(() => {
  const { t } = useTranslation();
  const { settings, setSettings } = useAppSettings();
  const [visible, setVisible] = useState(false);
  const toggleDialog = useCallback(
    () => setVisible(!visible),
    [visible, setVisible]
  );

  return (
    <>
      <List.Item
        title={t('settings.username')}
        description={settings.username}
        onPress={toggleDialog}
      />
      <DialogEditUsername
        value={settings.username}
        visible={visible}
        onDismiss={toggleDialog}
      />
    </>
  );
});

const languages = {
  en: 'English',
  fr: 'Français'
};

const Language = memo(() => {
  const { t } = useTranslation();
  const { settings, setSettings } = useAppSettings();
  const [visible, setVisible] = useState(false);

  const openMenu = useCallback(() => setVisible(true), [setVisible]);
  const closeMenu = useCallback(() => setVisible(false), [setVisible]);

  return (
    <View style={{ flexDirection: 'row', paddingRight: 16 }}>
      <View style={{ flex: 1 }}>
        <List.Item
          title={t('settings.language')}
          description={languages[settings.language]}
          onPress={openMenu}
        />
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
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
          }>
          <Menu.Item
            onPress={() => setSettings.language('en')}
            title="English"
          />
          <Menu.Item
            onPress={() => setSettings.language('fr')}
            title="Français"
          />
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
    <View style={{ flexDirection: 'row', paddingRight: 16 }}>
      <View style={{ flex: 1 }}>
        <List.Item
          title={t('settings.monitoring')}
          description={t('dialog.monitoring.text')}
          onPress={() => toggleErrorMonitoring()}
        />
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
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
    <View style={{ flexDirection: 'row', paddingRight: 16 }}>
      <View style={{ flex: 1 }}>
        <List.Item
          title={t('settings.darkMode')}
          onPress={() => toggleDarkMode()}
        />
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
        <Switch value={darkMode} onValueChange={() => toggleDarkMode()} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexDirection: 'column'
  },
  switchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10
  },
  switchContainer2: { flexDirection: 'row', paddingRight: 16 },
  subheading: {
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 0
  }
});

export default SettingsScreen;
