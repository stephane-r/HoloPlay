// @flow
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Subheading, List, Divider } from 'react-native-paper';
import useStore from '../../hooks/useStore';
import DialogEditToken from '../../components/Dialog/EditToken';
import DialogEditApiInstance from '../../components/Dialog/EditApiInstance';

type FavorisProps = {
  navigation: Object
};

const SettingsScreen = ({ navigation }: FavorisProps) => {
  const store = useStore();
  const [showDialogToken, setShowDialogToken] = useState(false);
  const [showDialogApiInstance, setShowDialogApiInstance] = useState(false);

  const toggleDialogToken = () => setShowDialogToken(!showDialogToken);
  const toggleDialogApiInstance = () =>
    setShowDialogApiInstance(!showDialogApiInstance);

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
        <List.Item
          title="Invidious instance"
          description={store.instance}
          onPress={toggleDialogApiInstance}
        />
        <Divider />
        <List.Item
          title="Token"
          description={store.token}
          onPress={toggleDialogToken}
        />
      </View>
      <DialogEditToken
        label="Edit token"
        value={store.token}
        visible={showDialogToken}
        onDismiss={toggleDialogToken}
        onSubmit={() => alert('TODO')}
      />
      <DialogEditApiInstance
        value={store.instance}
        visible={showDialogApiInstance}
        onDismiss={toggleDialogApiInstance}
        onSubmit={() => alert('TODO')}
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
