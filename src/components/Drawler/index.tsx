import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Drawer,
  Switch,
  Paragraph,
  useTheme,
  IconButton
} from 'react-native-paper';
import { actions } from '../../store';
import AppVersion from '../Version';
import { useNavigation } from '@react-navigation/native';

interface Props {
  darkMode: boolean;
}

const Drawler: React.FC<Props> = ({ setTheme, darkMode }) => {
  const [isDarkMode, setDarkMode] = useState<boolean>(darkMode);
  const navigation = useNavigation();
  const { colors } = useTheme();

  const toggleDarkMode = (value): void => {
    setDarkMode(!isDarkMode);
    setTheme(value);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background
        }
      ]}>
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
          icon="cog"
          onPress={() => navigation.navigate('Settings')}
        />
        <View style={styles.switchContainer}>
          <Drawer.Item
            accessibilityStates={[]}
            label="Dark theme"
            icon="lightbulb-on"
          />
          <View
            style={{
              flex: 1,
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
      </Drawer.Section>
      <AppVersion />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  switchContainer: { flexDirection: 'row', paddingRight: 16 }
});

export default Drawler;
