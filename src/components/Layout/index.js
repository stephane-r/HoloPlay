// @flow
import * as React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Animated,
  DrawerLayoutAndroid,
  Dimensions
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import DrawlerContainer from '../../containers/Drawler';

const WINDOW_WIDTH = Dimensions.get('window').width;
const FROM_VALUE = WINDOW_WIDTH;
const TO_VALUE = 0;

type LayoutProps = {
  navigation: Object,
  children: React.Node
};

const Drawer = ({ visible, close }) => {
  const from = visible ? TO_VALUE : FROM_VALUE;
  const to = visible ? FROM_VALUE : TO_VALUE;

  const animatedValue = new Animated.Value(from);

  Animated.timing(animatedValue, {
    useNativeDriver: true,
    toValue: to
  }).start();

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: Dimensions.get('window').height,
        zIndex: 2,
        backgroundColor: 'red',
        transform: [{ translateX: animatedValue }]
      }}>
      <Text>Hello from drawer !</Text>
      <Button onPress={close}>Close drawer</Button>
    </Animated.View>
  );
};

const Layout = ({ navigation, children }: LayoutProps) => {
  const [visible, setIsVisible] = React.useState(false);

  const toggleDrawer = () => setIsVisible(!visible);

  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => <DrawlerContainer navigation={navigation} />}>
      <View style={{ flex: 1 }}>
        <Drawer
          visible={visible}
          close={toggleDrawer} />
        <ScrollView style={{ flex: 1 }}>
          <Button onPress={toggleDrawer}>Open drawer</Button>
          <View style={styles.container}>{children}</View>
        </ScrollView>
      </View>
    </DrawerLayoutAndroid>
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
