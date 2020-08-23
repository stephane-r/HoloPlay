import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { actions } from '../../store';
import Spacer from '../../components/Spacer';
import { FAVORIS_PLAYLIST_TITLE } from '../../constants';
import DashboardScreen from '../Dashboard';
import fetchPlaylists from '../../utils/fetchPlaylists';
import useInvidiousInstances from '../../hooks/useInvidiousInstances';

interface Props {
  onSuccess: () => void;
}

const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const { instances } = useInvidiousInstances();
  const [isLoading, setIsLoading] = useState(false);
  const [instance, setInstance] = useState<string>(
    instances[0]?.monitor?.name ?? instances[0]?.uri
  );
  const [customInstance, setCustomInstance] = useState<boolean>(false);
  const [token, setToken] = useState<null | string>(null);
  const [username, setUsername] = useState<string>('User');

  const onValueChange = (value: string): void => {
    if (value === 'other') {
      return setCustomInstance(true);
    }

    return setInstance(value);
  };

  const login = async (): Promise<any> => {
    try {
      if (token !== '' && token !== null) {
        setIsLoading(true);
        await Promise.all([
          AsyncStorage.setItem('instance', instance),
          AsyncStorage.setItem('token', token)
        ]);
        await fetchPlaylists();
        actions.setUsername(username);
        setIsLoading(false);
        return onSuccess(token);
      }
    } catch (error) {
      console.log(error);
      actions.setFlashMessage(error);
    }
  };

  const loginWithoutToken = async (): Promise<any> => {
    const favorisPlaylist = {
      title: FAVORIS_PLAYLIST_TITLE,
      videos: [],
      playlistId: uuidv4()
    };

    try {
      setIsLoading(true);
      await Promise.all([
        AsyncStorage.setItem('instance', instance),
        AsyncStorage.setItem('logoutMode', JSON.stringify(true))
      ]);

      actions.setLogoutMode(true);
      actions.setUsername(username);
      actions.addPlaylist(favorisPlaylist);
      actions.receiveFavorisPlaylist(favorisPlaylist);

      setIsLoading(false);
      return onSuccess('null');
    } catch (error) {
      console.log(error);
      actions.setFlashMessage(error);
    }
  };

  return (
    <>
      <Picker selectedValue={instance} onValueChange={onValueChange}>
        {instances.map(({ uri, monitor }) => (
          <Picker.Item key={uri} label={monitor?.name ?? uri} value={uri} />
        ))}
      </Picker>
      <TextInput
        accessibilityStates={[]}
        mode="outlined"
        label="Token"
        value={token as string}
        onChangeText={setToken}
      />
      <Spacer height={20} />
      <TextInput
        accessibilityStates={[]}
        mode="outlined"
        label="Username (optional)"
        value={username}
        onChangeText={setUsername}
      />
      <Spacer height={20} />
      {customInstance && (
        <>
          <TextInput
            accessibilityStates={[]}
            mode="outlined"
            label="Instance"
            value={instance}
            onChangeText={setInstance}
          />
          <Spacer height={20} />
        </>
      )}
      <Button mode="contained" onPress={login} loading={isLoading}>
        Save token
      </Button>
      <Spacer height={20} />
      <View style={{ justifyContent: 'flex-end' }}>
        <Button mode="outlined" onPress={loginWithoutToken}>
          Skip
        </Button>
      </View>
    </>
  );
};

export default LoginForm;
