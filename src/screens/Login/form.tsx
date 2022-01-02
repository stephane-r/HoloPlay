import React, { useEffect, useState } from 'react';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
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
import { useTranslation } from 'react-i18next';
import getLanguageName from '../../utils/getLanguageName';
import stripTrailingSlash from '../../utils/stripTrailingSlash';
import { useCallback } from 'react';
import { useAppSettings } from '../../providers/App';
import { useNavigation } from '@react-navigation/native';

interface Props {
  onSuccess: () => void;
}

const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const { instances } = useInvidiousInstances();
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [instance, setInstance] = useState<string>(
    instances[0]?.monitor?.name ?? instances[0]?.uri
  );
  const [customInstance, setCustomInstance] = useState<boolean>(false);
  const [token, setToken] = useState<null | string>(null);
  const [username, setUsername] = useState<string>('User');
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { settings, setSettings } = useAppSettings();
  const navigation = useNavigation();

  const onValueChange = (value: string): void => {
    if (value === 'other') {
      return setCustomInstance(true);
    }

    return setInstance(stripTrailingSlash(value));
  };

  const onChangeLanguage = (lng: string): void => {
    i18n.changeLanguage(lng);
    actions.setLanguage(lng);
    setLanguage(lng);
  };

  const login = async (): Promise<any> => {
    try {
      if (token !== '' && token !== null) {
        setIsLoading(true);
        await Promise.all([
          actions.setInstance(instance),
          AsyncStorage.setItem('token', token)
        ]);
        await fetchPlaylists();
        actions.setUsername(username);
        return onSuccess(token);
      }
    } catch (error) {
      actions.setSnackbar({ message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithoutToken = useCallback(async (): void => {
    const favorisPlaylist = {
      title: FAVORIS_PLAYLIST_TITLE,
      videos: [],
      playlistId: uuidv4()
    };

    try {
      setIsLoading(true);

      actions.setInstance(instance);

      setSettings.skipLogin(true);

      // actions.setLogoutMode(true);
      // actions.setUsername(username);
      actions.addPlaylist(favorisPlaylist);
      actions.receiveFavorisPlaylist(favorisPlaylist);

      setIsLoading(false);
      navigation.navigate('App');
    } catch (error) {
      actions.setSnackbar(error);
    }
  }, [actions, instance, setIsLoading]);

  useEffect(() => {
    AsyncStorage.getItem('token').then(cachedToken => {
      if (cachedToken) {
        setToken(cachedToken);
      }
    });
  }, []);

  return (
    <>
      <View style={styles.picker}>
        <Picker
          style={{ color: colors.text }}
          selectedValue={language}
          onValueChange={onChangeLanguage}>
          {['en', 'fr'].map(lng => (
            <Picker.Item key={lng} label={getLanguageName(lng)} value={lng} />
          ))}
        </Picker>
      </View>
      <Spacer height={20} />
      <View style={styles.picker}>
        <Picker
          style={{ color: colors.text }}
          selectedValue={instance}
          onValueChange={onValueChange}>
          {instances.map(({ uri, monitor }) => (
            <Picker.Item key={uri} label={monitor?.name ?? uri} value={uri} />
          ))}
        </Picker>
      </View>
      <Spacer height={20} />
      <TextInput
        accessibilityStates={[]}
        mode="outlined"
        label={t('login.token')}
        value={token as string}
        onChangeText={setToken}
      />
      <Spacer height={20} />
      <TextInput
        accessibilityStates={[]}
        mode="outlined"
        label={t('login.username')}
        value={username}
        onChangeText={setUsername}
      />
      <Spacer height={20} />
      {customInstance && (
        <>
          <TextInput
            accessibilityStates={[]}
            mode="outlined"
            label={t('login.instance')}
            value={instance}
            onChangeText={setInstance}
          />
          <Spacer height={20} />
        </>
      )}
      <Button mode="contained" onPress={login} loading={isLoading}>
        {t('login.buttonSaveToken')}
      </Button>
      <Spacer height={20} />
      <View style={{ justifyContent: 'flex-end' }}>
        <Button mode="outlined" onPress={loginWithoutToken}>
          {t('login.buttonSkip')}
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 55,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .5)',
    borderRadius: 4,
    paddingLeft: 5
  }
});

export default LoginForm;
