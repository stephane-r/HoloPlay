import React, { useState } from 'react';
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
  Switch
} from 'react-native-paper';
import useStore from '../../hooks/useStore';
import useBackup from '../../hooks/useBackup';
import DialogEditToken from '../../components/Dialog/EditToken';
import DialogEditApiInstance from '../../components/Dialog/EditApiInstance';
import DialogEditUsername from '../../components/Dialog/EditUsername';
import DialogErrorMonitoring from '../../components/Dialog/ErrorMonitoring';
import DialogLanguage from '../../components/Dialog/Language';
import { useTranslation } from 'react-i18next';
import getLanguageName from '../../utils/getLanguageName';
import { ScrollView } from 'react-native-gesture-handler';
import Spacer from '../../components/Spacer';
import { NavigationHelpersCommon } from '@react-navigation/native';
import { actions, connect } from '../../store';

interface Props {
  navigation: NavigationHelpersCommon;
}

const DEVICE_HEIGHT = Dimensions.get('window').height;

const SettingsScreen: React.FC<Props> = ({ navigation, route, darkMode }) => {
  const { t } = useTranslation();
  const store = useStore();
  const { colors } = useTheme();
  const [showDialogToken, setShowDialogToken] = useState(false);
  const [showDialogApiInstance, setShowDialogApiInstance] = useState(false);
  const [showDialogUsername, setShowDialogUsername] = useState(false);
  const [showDialogErrorMonitoring, setShowDialogErrorMonitoring] =
    useState(false);
  const [showDialogLanguage, setShowDialogLanguage] = useState(false);
  const { backupData, importData } = useBackup();
  const [isDarkMode, setDarkMode] = useState(true);

  const toggleDarkMode = (value): void => {
    setDarkMode(!isDarkMode);
    route.params.toggleTheme(value);
  };

  const toggleDialogToken = () => setShowDialogToken(!showDialogToken);
  const toggleDialogApiInstance = () =>
    setShowDialogApiInstance(!showDialogApiInstance);
  const toggleDialogUsername = () => setShowDialogUsername(!showDialogUsername);
  const toggleDialogErrorMoniroting = () =>
    setShowDialogErrorMonitoring(!showDialogErrorMonitoring);
  const toggleDialogLanguage = () => setShowDialogLanguage(!showDialogLanguage);

  return (
    <ScrollView>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, minHeight: DEVICE_HEIGHT }
        ]}>
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
          <View style={styles.switchContainer2}>
            <View style={{ flex: 1 }}>
              <List.Item
                accessibilityStates={[]}
                title={t('settings.invidiousInstance')}
                description={store.instance}
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
          <Divider accessibilityStates={[]} />
          <List.Item
            accessibilityStates={[]}
            title={t('settings.token')}
            description={store.token ?? t('settings.tokenEmpty')}
            onPress={toggleDialogToken}
          />
          <Divider accessibilityStates={[]} />
        </View>
        <View style={styles.content}>
          <Subheading style={styles.subheading}>
            {t('settings.application')}
          </Subheading>
          <List.Item
            accessibilityStates={[]}
            title={t('settings.username')}
            description={store.username}
            onPress={toggleDialogUsername}
          />
          <Divider accessibilityStates={[]} />
          <View>
            <List.Item
              accessibilityStates={[]}
              title={t('settings.language')}
              description={getLanguageName(store.language)}
              onPress={toggleDialogLanguage}
            />
          </View>
          <Divider accessibilityStates={[]} />
          <ErrorMonitoringContainer store={store} t={t} />
          <Divider accessibilityStates={[]} />
          <View style={styles.switchContainer2}>
            <View style={{ flex: 1 }}>
              <List.Item
                accessibilityStates={[]}
                title={t('settings.darkMode')}
                onPress={() => toggleDarkMode(!isDarkMode)}
              />
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}>
              <Switch
                accessibilityStates={[]}
                value={isDarkMode}
                onValueChange={toggleDarkMode}
              />
            </View>
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
        <DialogEditToken
          value={store.token as string}
          visible={showDialogToken}
          onDismiss={toggleDialogToken}
          toggleDialog={toggleDialogToken}
        />
        <DialogEditUsername
          value={store.username as string}
          visible={showDialogUsername}
          onDismiss={toggleDialogUsername}
          toggleDialog={toggleDialogUsername}
        />
        <DialogLanguage
          value={store.language}
          visible={showDialogLanguage}
          onDismiss={toggleDialogLanguage}
          toggleDialog={toggleDialogLanguage}
        />
      </View>
      <Spacer height={20} />
    </ScrollView>
  );
};

const ErrorMonitoring = ({ store, t, sendErrorMonitoring }) => {
  const toggleErrorMonitoring = () => {
    try {
      actions.setSendErrorMonitoring(!sendErrorMonitoring);
    } catch (error) {
      actions.setSnackbar({
        message: error.message
      });
    }
  };

  return (
    <View style={styles.switchContainer2}>
      <View style={{ flex: 1 }}>
        <List.Item
          accessibilityStates={[]}
          title={t('settings.monitoring')}
          description={t('dialog.monitoring.text')}
          onPress={() => toggleErrorMonitoring(!store.sendErrorMonitoring)}
        />
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
        <Switch
          accessibilityStates={[]}
          value={sendErrorMonitoring}
          onValueChange={() => toggleErrorMonitoring()}
        />
      </View>
    </View>
  );
};

const ErrorMonitoringContainer = connect(({ sendErrorMonitoring }: Store) => ({
  sendErrorMonitoring
}))(ErrorMonitoring);

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
