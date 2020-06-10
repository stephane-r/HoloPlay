// @flow
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { Picker, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { actions } from '../../store';
import Spacer from '../../components/Spacer';

type LoginFormProps = {
  navigation: Object,
  loginIsFecthing: Boolean
};

const PUBLIC_INVIDIOUS_INSTANCS = [
  {
    value: 'https://invidio.us',
    label: 'invidio.us (Official Instance)'
  },
  {
    value: 'https://invidious.snopyta.org',
    label: 'invidious.snopyta.org'
  },
  {
    value: 'https://yewtu.be',
    label: 'yewtu.be'
  },
  {
    value: 'https://invidious.ggc-project.de',
    label: 'invidious.ggc-project.de'
  },
  {
    value: 'https://yt.maisputain.ovh',
    label: 'yt.maisputain.ovh'
  },
  {
    value: 'https://invidious.13ad.de',
    label: 'invidious.13ad.de'
  },
  {
    value: 'https://invidious.fdn.fr',
    label: 'invidious.fdn.fr'
  },
  {
    value: 'https://watch.nettohikari.com',
    label: 'watch.nettohikari.com'
  },
  {
    value: 'other',
    label: 'Other'
  }
];

const LoginForm = ({ navigation, loginIsFecthing }: LoginFormProps) => {
  const [instance, setInstance] = useState(PUBLIC_INVIDIOUS_INSTANCS[0].value);
  const [customInstance, setCustomInstance] = useState(false);
  const [token, setToken] = useState(null);

  const onValueChange = value => {
    if (value === 'other') {
      return setCustomInstance(true);
    }

    return setInstance(value);
  };

  const login = async () => {
    try {
      if (token !== '') {
        await Promise.all([
          AsyncStorage.setItem('instance', instance),
          AsyncStorage.setItem('token', token)
        ]);
        actions.setLoginIsFetched();
        actions.setConnected();
        return goToDashboard();
      }
    } catch (error) {
      await actions.setLoginIsFetched();
      actions.setFlashMessage(error.message);
    }
  };

  const goToDashboard = () => navigation.navigate('Dashboard');

  return (
    <>
      <Picker selectedValue={instance} onValueChange={onValueChange}>
        {PUBLIC_INVIDIOUS_INSTANCS.map(({ value, label }, index) => (
          <Picker.Item key={index} label={label} value={value} />
        ))}
      </Picker>
      <TextInput
        mode="outlined"
        label="Token"
        value={token}
        onChangeText={setToken}
      />
      <Spacer height={20} />
      {customInstance && (
        <>
          <TextInput
            mode="outlined"
            label="Instance"
            value={instance}
            onChangeText={setInstance}
          />
          <Spacer height={20} />
        </>
      )}
      <Button mode="contained" onPress={login} loading={loginIsFecthing}>
        Save token
      </Button>
      <Spacer height={20} />
      <View style={{ justifyContent: 'flex-end' }}>
        <Button mode="outline" onPress={goToDashboard}>
          Skip
        </Button>
      </View>
    </>
  );
};

export default LoginForm;
