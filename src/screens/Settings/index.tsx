import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Subheading, List, Divider } from 'react-native-paper';
import useStore from '../../hooks/useStore';
import DialogEditToken from '../../components/Dialog/EditToken';
import DialogEditApiInstance from '../../components/Dialog/EditApiInstance';

interface Props {
  navigation: any;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const store = useStore();
  const [showDialogToken, setShowDialogToken] = useState(false);
  const [showDialogApiInstance, setShowDialogApiInstance] = useState(false);

  const toggleDialogToken = () => setShowDialogToken(!showDialogToken);
  const toggleDialogApiInstance = () =>
    setShowDialogApiInstance(!showDialogApiInstance);

  return (
    <View style={styles.container}>
      <Appbar accessibilityStates={[]}>
        <Appbar.BackAction
          accessibilityStates={[]}
          icon="archive"
          onPress={(): void => navigation.goBack()}
        />
        <Appbar.Content title="App Settings" accessibilityStates={[]} />
      </Appbar>
      <View style={styles.content}>
        <Subheading style={styles.subheading}>API</Subheading>
        <View style={{ height: 15 }} />
        <Divider accessibilityStates={[]} />
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
      </View>
      <DialogEditToken
        label="Edit token"
        value={store.token as string}
        visible={showDialogToken}
        onDismiss={toggleDialogToken}
        onSubmit={(): void => console.log('TODO')}
      />
      <DialogEditApiInstance
        value={store.instance as string}
        visible={showDialogApiInstance}
        onDismiss={toggleDialogApiInstance}
        onSubmit={(): void => console.log('TODO')}
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

// @ts-ignore
SettingsScreen.path = 'settings';

// @ts-ignore
SettingsScreen.navigationOptions = () => ({
  title: 'Settings',
  linkName: 'Settings'
});

export default SettingsScreen;
