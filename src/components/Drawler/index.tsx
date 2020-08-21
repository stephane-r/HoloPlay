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
import { useTranslation } from 'react-i18next';

interface Props {
  darkMode: boolean;
}

const Drawler: React.FC<Props> = ({ setTheme, darkMode }) => {
  const [isDarkMode, setDarkMode] = useState<boolean>(darkMode);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useTranslation();

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
      <Drawer.Section title={t('drawler.title')}>
        <Drawer.Item
          accessibilityStates={[]}
          label={t('drawler.createPlaylist')}
          icon="folder-plus"
          onPress={() => navigation.navigate('Playlists')}
        />
        <Drawer.Item
          accessibilityStates={[]}
          label={t('drawler.settings')}
          icon="cog"
          onPress={() => navigation.navigate('Settings')}
        />
        <View style={styles.switchContainer}>
          <Drawer.Item
            accessibilityStates={[]}
            label={t('drawler.darkMode')}
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
