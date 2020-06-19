import React, { useRef, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Drawer from 'react-native-drawer-menu';
import DrawlerContainer from '../../containers/Drawler';
import { Text, Button } from 'react-native-paper';
import { actions } from '../../store';

const Layout: React.FC = ({ children }) => (
  <Drawer
    drawerWidth={300}
    type={Drawer.types.Overlay}
    leftDrawerContent={<DrawlerContainer />}
    drawerPosition={Drawer.positions.Left}>
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>{children}</View>
      </ScrollView>
    </View>
  </Drawer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f6f9',
    paddingHorizontal: 16
  }
});

export default Layout;
