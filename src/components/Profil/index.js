// @flow
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { View, Image, StyleSheet } from 'react-native';
import { Title, Text } from 'react-native-paper';
import Spacer from '../Spacer';
import GET_USER from '../../query/me';

const Profil = () => {
  const { data, error, loading } = useQuery(GET_USER);

  if (error || loading) {
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
          }}>{`Hey ${data.me.username}`}</Title>
        <Spacer height={5} />
        <Text style={{ color: 'white' }}>Welcome home</Text>
      </View>
      <Image
        source={{ uri: 'https://picsum.photos/60/60' }}
        style={{ width: 60, height: 60, borderRadius: 60 }}
      />
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
