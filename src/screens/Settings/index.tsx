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
  useTheme
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

interface Props {
  navigation: any;
}

const DEVICE_HEIGHT = Dimensions.get('window').height;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const store = useStore();
  const { colors } = useTheme();
  const [showDialogToken, setShowDialogToken] = useState(false);
  const [showDialogApiInstance, setShowDialogApiInstance] = useState(false);
  const [showDialogUsername, setShowDialogUsername] = useState(false);
  const [showDialogErrorMonitoring, setShowDialogErrorMonitoring] = useState(
    false
  );
  const [showDialogLanguage, setShowDialogLanguage] = useState(false);
  const { backupData, importData } = useBackup();

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
          <List.Item
            accessibilityStates={[]}
            title={t('settings.invidiousInstance')}
            description={store.instance}
            onPress={toggleDialogApiInstance}
          />
          <Divider accessibilityStates={[]} />
          <List.Item
            accessibilityStates={[]}
            title={t('settings.token')}
            description={store.token}
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
              title={t('settings.monitoring')}
              description={t(
                store.sendErrorMonitoring
                  ? 'settings.enabled'
                  : 'settings.disabled'
              )}
              onPress={toggleDialogErrorMoniroting}
            />
          </View>
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
        <DialogEditApiInstance
          value={store.instance as string}
          visible={showDialogApiInstance}
          onDismiss={toggleDialogApiInstance}
          toggleDialog={toggleDialogApiInstance}
        />
        <DialogEditUsername
          value={store.username as string}
          visible={showDialogUsername}
          onDismiss={toggleDialogUsername}
          toggleDialog={toggleDialogUsername}
        />
        <DialogErrorMonitoring
          value={store.sendErrorMonitoring as string}
          visible={showDialogErrorMonitoring}
          onDismiss={toggleDialogErrorMoniroting}
          toggleDialog={toggleDialogErrorMoniroting}
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
  subheading: {
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 0
  }
});

export default SettingsScreen;
