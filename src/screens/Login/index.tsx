import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginFormContainer from '../../containers/Login';
import AppVersion from '../../components/Version';

interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => (
  <View style={styles.container}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <LoginFormContainer navigation={navigation} />
    </View>
    <AppVersion customStyle={{ alignSelf: 'center' }} />
  </View>
);

// @ts-ignore
LoginScreen.path = '';

// @ts-ignore
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
