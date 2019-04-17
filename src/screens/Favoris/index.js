import React from 'react';
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
      <Layout navigate={this.props.navigation}>
        <FavorisContainer onPress={this.loadSource} />
      </Layout>
    );
  }
}

export default Favoris;
