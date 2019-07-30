// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterForm from './form';

type RegisterProps = {
  navigation: Object
};

const Register = (props: RegisterProps) => (
  <View style={styles.container}>
    <RegisterForm navigation={props.navigation} />
  </View>
);

Register.navigationOptions = () => ({
  title: 'Register',
  linkName: 'Register'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  }
});

export default Register;
