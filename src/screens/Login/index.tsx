import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppVersion from '../../components/Version';
import LoginForm from './form';

interface Props {
  setToken: () => void;
}

const LoginScreen: React.FC<Props> = ({ route }) => (
  <View style={styles.container}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <LoginForm onSuccess={route.params.setToken} />
    </View>
    <AppVersion customStyle={{ alignSelf: 'center' }} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  }
});

export default LoginScreen;
