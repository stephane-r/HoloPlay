// @flow
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { actions } from '../../store';
import Spacer from '../../components/Spacer';

type LoginFormProps = {
  navigation: Object,
  loginIsFecthing: Boolean
};

const LoginForm = ({ navigation, loginIsFecthing }: LoginFormProps) => {
  const [identifier, setIdentifier] = useState(null);
  const [password, setPassword] = useState(null);

  const login = async () => {
    try {
      if (
        (identifier !== '' || identifier !== null) &&
        (password !== '' || password !== null)
      ) {
        await actions.setLoginIsFetching();
        await actions.loginThroughApi({ identifier, password });
        await actions.setConnected();
        await actions.search();
        return goToDashboard();
      }
    } catch (error) {
      await actions.setLoginIsFetched();
      actions.setFlashMessage(error.message);
    }
  };

  const goToDashboard = () => navigation.navigate('Dashboard');
  const goToRegister = () => navigation.navigate('Register');

  return (
    <>
      <TextInput
        mode="outlined"
        label="identifier"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <Spacer height={15} />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Spacer height={20} />
      <Button
        mode="contained"
        onPress={login}
        loading={loginIsFecthing}>
        Login
      </Button>
      <Spacer height={20} />
      <Button
        mode="outlined"
        onPress={goToRegister}>
        Register
      </Button>
    </>
  );
};

export default LoginForm;
