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
import { Text, Button } from 'react-native-paper';
import { actions } from '../../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayerContainer from '../../containers/Player';
import BottomSheet from '../BottomSheet';

const Layout: React.FC = ({ children }) => {
  return (
    <DrawerLayout
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => <DrawlerContainer />}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>{children}</View>
        </ScrollView>
      </View>
    </DrawerLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f6f9',
    paddingHorizontal: 16
  }
});

export default Layout;
