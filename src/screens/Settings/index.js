// @flow
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Appbar,
  Switch,
  Subheading,
  List,
  Divider,
  TouchableRipple
} from 'react-native-paper';
import config from 'react-native-config';
import SettingsProfilContainer from '../../containers/SettingsProfil';
import DialogEditUserEmailContainer from '../../containers/DialogEditUserEmail';
import DialogEditUserUsernameContainer from '../../containers/DialogEditUserUsername';

const { API_URL, YOUTUBE_API_KEY, YOUTUBE_API_STREAM_URL } = config;

type FavorisProps = {
  navigation: Object
};

const SettingsScreen = ({ navigation }: FavorisProps) => {
  const [showDialogName, setToggleDialogName] = useState(false);
  const [showDialogEmail, setToggleDialogEmail] = useState(false);
  const [enableCustomApi, setEnableCustomApi] = useState(false);

  const toggleDialogName = () => setToggleDialogName(!showDialogName);
  const toggleDialogEmail = () => setToggleDialogEmail(!showDialogEmail);

  const opacity = enableCustomApi ? 1 : 0.3;

  return (
    <View
      style={styles.container}
      navigation={navigation}>
      <Appbar>
        <Appbar.BackAction
          icon="archive"
          onPress={() => navigation.navigate('Dashboard')}
        />
        <Appbar.Content title="App Settings" />
      </Appbar>
      <View style={styles.content}>
        <Subheading style={styles.subheading}>ACCOUNT</Subheading>
        <SettingsProfilContainer
          toggleDialogName={toggleDialogName}
          toggleDialogEmail={toggleDialogEmail}
        />
        <Subheading style={styles.subheading}>SETTINGS</Subheading>
        <TouchableRipple onPress={() => setEnableCustomApi(!enableCustomApi)}>
          <List.Item
            title="Enable custom API's"
            right={() => (
              <Switch
                value={enableCustomApi}
                onValueChange={setEnableCustomApi}
              />
            )}
          />
        </TouchableRipple>
        <Divider />
        <List.Item
          title="API URL"
          description={API_URL}
          style={{ opacity }} />
        <Divider />
        <List.Item
          title="Youtube API Stream URL"
          description={YOUTUBE_API_STREAM_URL}
          style={{ opacity }}
        />
        <Divider />
        <List.Item
          title="Youtube API Key"
          description={YOUTUBE_API_KEY}
          style={{ opacity }}
        />
      </View>
      <DialogEditUserEmailContainer
        visible={showDialogEmail}
        onDismiss={toggleDialogEmail}
      />
      <DialogEditUserUsernameContainer
        visible={showDialogName}
        onDismiss={toggleDialogName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6f9',
    flex: 1
  },
  content: {
    flexDirection: 'column',
    backgroundColor: '#f5f6f9'
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

SettingsScreen.path = 'settings';

SettingsScreen.navigationOptions = () => ({
  title: 'Settings',
  linkName: 'Settings'
});

export default SettingsScreen;
