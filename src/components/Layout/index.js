import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { actions } from '../../store';

const Layout = ({ children, navigate }) => {
  const logout = async () => {
    await actions.logout();
    return navigate.navigate('Login');
  };

  return (
    <>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.container}>{children}</View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default Layout;
