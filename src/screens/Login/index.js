// @flow
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Input from '../../components/Forms/Input';
import { actions } from '../../store';

type Props = {
  navigation: Object
};

const LoginScreen = ({ navigation }: Props) => {
  const [identifier, setIdentifier] = useState('contact@stephane-richin.fr');
  const [password, setPassword] = useState('azerty');

  const login = async () => {
    try {
      await actions.loginThroughApi({ identifier, password });
      await actions.setConnected();
      await actions.search();
      return goToDashboard();
    } catch (error) {
      alert(error);
    }
  };

  const goToDashboard = () => navigation.navigate('Dashboard');
  const goToRegister = () => navigation.navigate('Register');

  return (
    <View>
      <Input
        onChangeText={value => setIdentifier(value)}
        placeholder="identifier"
        value={identifier}
      />
      <Input
        onChangeText={value => setPassword(value)}
        placeholder="Password"
        value={password}
      />
      <Button
        title="Login"
        onPress={login} />
      <Button
        title="Register"
        onPress={goToRegister} />
    </View>
  );
};

LoginScreen.path = '';

LoginScreen.navigationOptions = () => ({
  title: 'Login',
  linkName: 'Login'
});

export default LoginScreen;
