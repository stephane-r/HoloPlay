import React from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import FavorisPlaylistContainer from '../../containers/Favoris/Playlist';

const Favoris: React.FC = () => (
  <Layout>
    <Header title="Favoris" backgroundColor="#EE05F2" />
    <FavorisPlaylistContainer />
  </Layout>
);

export default Favoris;
