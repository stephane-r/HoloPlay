// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginFormContainer from '../../containers/Login';
import AppVersion from '../../components/Version';

type Props = {
  navigation: Object
};

const LoginScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <LoginFormContainer navigation={navigation} />
    </View>
    <AppVersion customStyle={{ alignSelf: 'center' }} />
  </View>
);

LoginScreen.path = '';

LoginScreen.navigationOptions = () => ({
  title: 'Login',
  linkName: 'Login',
  header: null
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  }
});

export default LoginScreen;
