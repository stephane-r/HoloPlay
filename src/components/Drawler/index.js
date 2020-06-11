// @flow
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Switch, Paragraph } from 'react-native-paper';
import { actions } from '../../store';
import AppVersion from '../Version';

type DrawlerProps = {
  navigation: Object,
  darkMode: boolean
};

const Drawler = ({ navigation, darkMode }: DrawlerProps) => {
  const [isDarkMode, setDarkMode] = useState(darkMode);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    actions.setDarkMode(!isDarkMode);
  };

  return (
    <View style={styles.container}>
      <Drawer.Section title="Navigation">
        <Drawer.Item
          label="Create new playlist"
          icon="folder-plus"
          onPress={() => navigation.navigate('Playlist')}
        />
        <Drawer.Item
          label="Settings"
          icon="settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <View style={styles.switchContainer}>
          <Paragraph style={styles.paragraph}>Dark theme (soon)</Paragraph>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
      </Drawer.Section>
      <AppVersion />
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
