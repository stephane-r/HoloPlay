import React from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import FavorisPlaylistContainer from '../../containers/Favoris/Playlist';
import { FAVORIS_COLOR } from '../../../config/theme';

const Favoris: React.FC = () => (
  <Layout>
    <Header title="Favoris" backgroundColor={FAVORIS_COLOR} />
    <FavorisPlaylistContainer />
  </Layout>
);

export default Favoris;
