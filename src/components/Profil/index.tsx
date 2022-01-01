import React, { memo } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Text, IconButton } from 'react-native-paper';
import Spacer from '../Spacer';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

const Profil: React.FC = memo(({ username }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const goToInvidiousInstancesScreen = useCallback(
    () => navigation.navigate('InvidiousInstances'),
    [navigation]
  );
  const goToSettingsScreen = useCallback(
    () => navigation.navigate('Settings'),
    [navigation]
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Title style={styles.title}>
            {t('profil.hey', { userName: username })}
          </Title>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon="play-network"
            color="white"
            size={24}
            onPress={goToInvidiousInstancesScreen}
          />
          <IconButton
            icon="cog"
            color="white"
            size={24}
            onPress={goToSettingsScreen}
            style={{ marginHorizontal: 0 }}
          />
        </View>
      </View>
      <Text accessibilityStates={[]} style={styles.text}>
        {t('profil.welcom')}
      </Text>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1
  },
  title: {
    color: 'white',
    fontSize: 35,
    paddingTop: 5
  },
  text: {
    color: 'white'
  }
});

export default Profil;
