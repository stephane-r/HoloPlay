// @flow
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Text } from 'react-native-paper';
// import Text from '../Text';
import Spacer from '../Spacer';
import { actions } from '../../store';

type Props = {
  navigate: Function,
  user: Object
};

const Profil = ({ navigate, user }: Props) => {
  const logout = async () => {
    await actions.logout();
    return navigate.navigate('Login');
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Title
          style={{
            color: 'white',
            fontSize: 35,
            paddingTop: 5
          }}>{`Hey ${user.username}`}</Title>
        <Spacer height={5} />
        <Text style={{ color: 'white' }}>Welcome home</Text>
      </View>
      <TouchableOpacity onPress={logout}>
        <Image
          source={{ uri: 'https://picsum.photos/60/60' }}
          style={{ width: 60, height: 60, borderRadius: 60 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default Profil;
