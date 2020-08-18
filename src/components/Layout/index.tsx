import React, { useRef, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  DrawerLayoutAndroid
} from 'react-native';
import DrawlerContainer from '../../containers/Drawler';
import { Text, Button, useTheme } from 'react-native-paper';
import { actions } from '../../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayerContainer from '../../containers/Player';
import BottomSheet from '../BottomSheet';

const Layout: React.FC = ({ setTheme, children }) => {
  const { colors } = useTheme();

  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      renderNavigationView={() => <DrawlerContainer setTheme={setTheme} />}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={[styles.container]}>{children}</View>
        </ScrollView>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16
  }
});

export default Layout;
