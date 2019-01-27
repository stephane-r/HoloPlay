import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Link } from '@react-navigation/web';
import { actions, FavorisContainer } from '@youtube-audio-player/core';
import AudioContainer from '../../containers/Audio';

class Favoris extends React.Component {
  static path = 'favoris';

  static navigationOptions = () => ({
    title: 'Favoris',
    linkName: 'Favoris'
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Link routeName="DashboardScreen">Dashboard</Link>
        <FavorisContainer onPress={index => actions.loadSource(index)} />
        <AudioContainer />
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
