// @flow
import * as React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  DrawerLayoutAndroid
} from 'react-native';
import DrawlerContainer from '../../containers/Drawler';

interface Props {
  navigation: any;
}

const Layout: React.FC<any> = ({ navigation, children }) => (
  <DrawerLayoutAndroid
    drawerWidth={300}
    // @ts-ignore
    drawerPosition={DrawerLayoutAndroid.positions.Left}
    renderNavigationView={() => <DrawlerContainer navigation={navigation} />}>
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>{children}</View>
      </ScrollView>
    </View>
  </DrawerLayoutAndroid>
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
