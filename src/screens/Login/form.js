// @flow
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { actions } from '../../store';
import Spacer from '../../components/Spacer';

type LoginFormProps = {
  navigation: Object,
  loginIsFecthing: Boolean
};

const LoginForm = ({ navigation, loginIsFecthing }: LoginFormProps) => {
  const [identifier, setIdentifier] = useState(null);
  const [password, setPassword] = useState(null);
  const [showSnackbar, toggleSnackbar] = useState(false);
  const [snackbarMessage, setSnakbarMessage] = useState('');

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
      setSnakbarMessage(error.message);
      toggleSnackbar(true);
    }
  };

  const goToDashboard = () => navigation.navigate('Dashboard');
  // const goToRegister = () => navigation.navigate('Register');

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
      <Snackbar
        visible={showSnackbar}
        style={{ width: Dimensions.get('window').width - 32, margin: 16 }}
        onDismiss={() => toggleSnackbar(false)}
        action={{
          label: 'Close',
          onPress: () => toggleSnackbar(true)
        }}>
        {snackbarMessage}
      </Snackbar>
      {/* <Button
        title="Register"
        onPress={goToRegister} /> */}
    </>
  );
};

export default LoginForm;
