// @flow
import React, { useState } from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Drawer, Switch, Paragraph } from 'react-native-paper';
import { actions } from '../../store';

type DrawlerProps = {
  navigation: Object
};

const Drawler = ({ navigation }: DrawlerProps) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => setDarkTheme(!darkTheme);

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
          onPress={() => alert('TODO')}
        />
        <Drawer.Item
          label="Logout"
          icon="settings"
          onPress={logout} />
        <TouchableNativeFeedback onPress={toggleTheme}>
          <View style={styles.switchContainer}>
            <Paragraph style={styles.paragraph}>Dark theme</Paragraph>
            <Switch
              value={darkTheme}
              color="#2575f4"
              onValueChange={toggleTheme}
            />
          </View>
        </TouchableNativeFeedback>
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
