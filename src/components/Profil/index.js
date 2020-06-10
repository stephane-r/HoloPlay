// @flow
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Title, Text } from 'react-native-paper';
import Spacer from '../Spacer';

const Profil = () => (
  <View style={styles.container}>
    <View style={{ flex: 1 }}>
      <Title style={styles.title}>Hey Stéphane</Title>
      <Spacer height={5} />
      <Text style={styles.text}>Welcome home</Text>
    </View>
    <Image
      source={{ uri: 'https://picsum.photos/60/60' }}
      style={styles.image}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
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
