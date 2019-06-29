// @flow
import React from 'react';
import { actions } from '../../store';
import FavorisContainer from '../../containers/Favoris';
import Layout from '../../components/Layout';
import Header from '../../components/Header';

type FavorisProps = {
  navigation: Object
};

const Favoris = ({ navigation }: FavorisProps) => {
  const loadSource = async index => {
    await actions.setPlaylistFrom('favoris');
    return actions.loadSource(index);
  };

  return (
    <Layout navigation={navigation}>
      <Header
        title="Favoris"
        backgroundColor="#EE05F2" />
      <FavorisContainer onPress={loadSource} />
    </Layout>
  );
};

Favoris.path = 'favoris';

Favoris.navigationOptions = () => ({
  title: 'Favoris',
  linkName: 'Favoris'
});

export default Favoris;
