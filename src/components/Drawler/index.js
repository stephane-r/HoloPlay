// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Switch, Paragraph } from 'react-native-paper';
import { actions } from '../../store';

type DrawlerProps = {
  navigation: Object,
  darkMode: boolean
};

const Drawler = ({ navigation, darkMode }: DrawlerProps) => {
  const logout = async () => {
    await actions.logout();
    return navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Drawer.Section title="Navigation">
        <Drawer.Item
          label="Create new playlist"
          icon="create-new-folder"
          onPress={() => navigation.navigate('Playlist')}
        />
        <Drawer.Item
          label="Settings"
          icon="settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <Drawer.Item
          label="Logout"
          icon="settings"
          onPress={logout} />
        <View style={styles.switchContainer}>
          <Paragraph style={styles.paragraph}>Dark theme</Paragraph>
          <Switch
            value={darkMode}
            onValueChange={actions.setDarkMode} />
        </View>
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  switchContainer: { flexDirection: 'row', padding: 16 },
  paragraph: {
    flex: 1
  }
});

export default Drawler;
