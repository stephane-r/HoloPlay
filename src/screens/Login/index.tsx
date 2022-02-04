import React from 'react';
import { View, StyleSheet } from 'react-native';
import {AppVersion} from '../../components/Version';
import { InstancesProvider } from '../../containers/InstanceList';
import {LoginForm} from './form';

interface Props {
  setToken: () => void;
}

const LoginScreen: React.FC<Props> = () => (
  <View style={styles.container}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <InstancesProvider>
      <LoginForm />
      </InstancesProvider>
    </View>
    <AppVersion />
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
