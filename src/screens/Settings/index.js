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
import useStore from '../../hooks/useStore';

const { API_URL, YOUTUBE_API_KEY, YOUTUBE_API_STREAM_URL } = config;

type FavorisProps = {
  navigation: Object
};

const SettingsScreen = ({ navigation }: FavorisProps) => {
  const store = useStore();

  return (
    <View style={styles.container}>
      <Appbar>
        <Appbar.BackAction
          icon="archive"
          onPress={() => navigation.navigate('Dashboard')}
        />
        <Appbar.Content title="App Settings" />
      </Appbar>
      <View style={styles.content}>
        <Subheading style={styles.subheading}>API</Subheading>
        <View style={{ height: 15 }} />
        <Divider />
        <List.Item title="Invidious instance" description={store.instance} />
        <Divider />
        <List.Item title="Token" description={store.token} />
      </View>
      {/* <DialogEditUserEmailContainer
        visible={showDialogEmail}
        onDismiss={toggleDialogEmail}
      />
      <DialogEditUserUsernameContainer
        visible={showDialogName}
        onDismiss={toggleDialogName}
      /> */}
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
