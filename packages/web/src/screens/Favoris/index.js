import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Link } from '@react-navigation/web';
import { actions, FavorisContainer } from '@youtube-audio-player/core';

class Favoris extends React.Component {
  static path = 'favoris';

  static navigationOptions = () => ({
    title: 'Favoris',
    linkName: 'Favoris'
  });

  async loadSource(index) {
    await actions.setSourceOrigin('favoris');
    return actions.loadSource(index);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Link routeName="DashboardScreen">Dashboard</Link>
        <FavorisContainer onPress={this.loadSource} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default Favoris;
