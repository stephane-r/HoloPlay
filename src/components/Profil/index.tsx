import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
      <Image
        source={{ uri: 'https://picsum.photos/60/60' }}
        style={styles.image}
      />
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
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60
  }
});

export default Profil;
