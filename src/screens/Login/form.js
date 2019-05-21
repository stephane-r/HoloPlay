// @flow
import React, { useState } from 'react';
import { Button } from 'react-native';
import Input from '../../components/Forms/Input';
import { actions } from '../../store';
import Spacer from '../../components/Spacer';

type Props = {
  navigation: Object,
  loginIsFecthing: Boolean
};

const LoginForm = ({ navigation, loginIsFecthing }: Props) => {
  const [identifier, setIdentifier] = useState('contact@stephane-richin.fr');
  const [password, setPassword] = useState('azerty');

  const login = async () => {
    try {
      await actions.setLoginIsFetching();
      await actions.loginThroughApi({ identifier, password });
      await actions.setConnected();
      await actions.search();
      return goToDashboard();
    } catch (error) {
      await actions.setLoginIsFetched();
      alert(error);
    }
  };

  const goToDashboard = () => navigation.navigate('Dashboard');
  // const goToRegister = () => navigation.navigate('Register');

  return (
    <>
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
      {loginIsFecthing && <Button title="Register" />}
      <Button
        title="Login"
        onPress={login} />
      <Spacer height={20} />
      {/* <Button
        title="Register"
        onPress={goToRegister} /> */}
    </>
  );
};

export default LoginForm;
