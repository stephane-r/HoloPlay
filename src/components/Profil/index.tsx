import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Text } from 'react-native-paper';
import Spacer from '../Spacer';
import { useTranslation } from 'react-i18next';

const Profil: React.FC = ({ username }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Title style={styles.title}>
          {t('profil.hey', { userName: username })}
        </Title>
        <Spacer height={5} />
        <Text accessibilityStates={[]} style={styles.text}>
          {t('profil.welcom')}
        </Text>
      </View>
    </View>
  );
};

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
