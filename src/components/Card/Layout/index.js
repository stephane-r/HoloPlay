import React from 'react';
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Text from '../../Text';
import Title from '../../Title';
import Spacer from '../../Spacer';

const CardLayout = ({ customStyle }) => (
  <View style={styles.container}>
    <TouchableNativeFeedback>
      <View style={[styles.card, customStyle]}>
        <Image
          resizeMode="cover"
          style={styles.picture}
          source={{ uri: 'https://picsum.photos/200/100' }}
        />
        <Title
          level="3"
          title="card title" />
        <Spacer height={5} />
        <View style={styles.footer}>
          <Text>26 songs</Text>
          <Text>13.1w</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '50%',
    paddingHorizontal: 8,
    paddingBottom: 20
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10
  },
  picture: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    transform: [{ translateY: -15 }]
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default CardLayout;
