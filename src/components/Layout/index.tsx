import React, { useRef, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';
import DrawerLayout from 'react-native-drawer-layout';
import DrawlerContainer from '../../containers/Drawler';
import { Text, Button, useTheme } from 'react-native-paper';
import { actions } from '../../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayerContainer from '../../containers/Player';
import BottomSheet from '../BottomSheet';

const Layout: React.FC = ({ setTheme, children }) => {
  const { colors } = useTheme();

  return (
    <DrawerLayout
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => <DrawlerContainer setTheme={setTheme} />}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={[styles.container]}>{children}</View>
        </ScrollView>
      </View>
    </DrawerLayout>
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
