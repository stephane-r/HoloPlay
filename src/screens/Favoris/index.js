import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { actions } from '../../store';
import FavorisContainer from '../../containers/Favoris';
import Layout from '../../components/Layout';

class Favoris extends React.Component {
  static path = 'favoris';

  static navigationOptions = () => ({
    title: 'Favoris',
    linkName: 'Favoris'
  });

  async loadSource(index) {
    await actions.setPlaylistFrom('favoris');
    return actions.loadSource(index);
  }

  render() {
    return (
      <Layout style={styles.container}>
        <TouchableOpacity onPress={() => console.log('logout')}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <FavorisContainer onPress={this.loadSource} />
      </Layout>
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
