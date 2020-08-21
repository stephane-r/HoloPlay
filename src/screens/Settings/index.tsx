import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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

interface Props {
  navigation: any;
}

const getLanguageName = (lng: 'en' | 'fr'): string => {
  let language;

  switch (true) {
    case lng === 'fr':
      language = 'Français';
      break;
    default:
      language = 'English';
      break;
  }

  return language;
};

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar accessibilityStates={[]}>
        <Appbar.BackAction
          accessibilityStates={[]}
          icon="archive"
          onPress={(): void => navigation.goBack()}
        />
        <Appbar.Content title="Settings" accessibilityStates={[]} />
      </Appbar>
      <View style={styles.content}>
        <Subheading style={styles.subheading}>API</Subheading>
        <List.Item
          accessibilityStates={[]}
          title="Invidious instance"
          description={store.instance}
          onPress={toggleDialogApiInstance}
        />
        <Divider accessibilityStates={[]} />
        <List.Item
          accessibilityStates={[]}
          title="Token"
          description={store.token}
          onPress={toggleDialogToken}
        />
        <Divider accessibilityStates={[]} />
      </View>
      <View style={styles.content}>
        <Subheading style={styles.subheading}>APPLICATION</Subheading>
        <List.Item
          accessibilityStates={[]}
          title="Username"
          description={store.username}
          onPress={toggleDialogUsername}
        />
        <Divider accessibilityStates={[]} />
        <View>
          <List.Item
            accessibilityStates={[]}
            title="Error and Performance Monitoring"
            description={store.sendErrorMonitoring ? 'Enabled' : 'Disabled'}
            onPress={toggleDialogErrorMoniroting}
          />
        </View>
        <Divider accessibilityStates={[]} />
        <View>
          <List.Item
            accessibilityStates={[]}
            title="Language"
            description={getLanguageName(store.language)}
            onPress={toggleDialogLanguage}
          />
        </View>
        <Divider accessibilityStates={[]} />
      </View>
      <View style={styles.content}>
        <Subheading style={styles.subheading}>DATA</Subheading>
        <View style={{ height: 15 }} />
        <View
          style={{
            paddingHorizontal: 15
          }}>
          <Text>Import or export your playlists and favoris</Text>
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
            Export
          </Button>
          <Button
            style={{ flex: 1, marginHorizontal: 7 }}
            mode="contained"
            onPress={importData}>
            Import
          </Button>
        </View>
      </View>
      <DialogEditToken
        label="Edit token"
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
