// @flow
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Switch, Paragraph } from 'react-native-paper';
import { actions } from '../../store';
import AppVersion from '../Version';
import { useNavigation } from '@react-navigation/native';

interface Props {
  darkMode: boolean;
}

const Drawler: React.FC<Props> = ({ darkMode }) => {
  const [isDarkMode, setDarkMode] = useState<boolean>(darkMode);
  const navigation = useNavigation();

  const toggleDarkMode = (): void => {
    setDarkMode(!isDarkMode);
    actions.setDarkMode(!isDarkMode);
  };

  return (
    <View style={styles.container}>
      <Drawer.Section title="Navigation">
        <Drawer.Item
          accessibilityStates={[]}
          label="Create new playlist"
          icon="folder-plus"
          onPress={() => navigation.navigate('Playlists')}
        />
        <Drawer.Item
          accessibilityStates={[]}
          label="Settings"
          icon="settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <View style={styles.switchContainer}>
          <Paragraph style={styles.paragraph}>Dark theme (soon)</Paragraph>
          <Switch
            accessibilityStates={[]}
            value={isDarkMode}
            onValueChange={toggleDarkMode}
          />
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
