import React from 'react';
import { actions } from '../../store';
import FavorisContainer from '../../containers/Favoris';
import Layout from '../../components/Layout';
import Title from '../../components/Title';
import Spacer from '../../components/Spacer';

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
        <Spacer height={20} />
        <Title
          level="2"
          title="Favoris" />
        <Spacer height={20} />
        <FavorisContainer onPress={this.loadSource} />
      </Layout>
    );
  }
}

export default Favoris;
