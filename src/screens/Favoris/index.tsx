import React from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import FavorisPlaylistContainer from '../../containers/Favoris/Playlist';
import { FAVORIS_COLOR } from '../../../config/theme';
import { useTheme } from 'react-native-paper';

const Favoris: React.FC = ({ route }) => {
  const { colors } = useTheme();

  return (
    <Layout setTheme={route.params.toggleTheme}>
      <Header title="Favoris" backgroundColor={colors.screens.favoris} />
      <FavorisPlaylistContainer />
    </Layout>
  );
};

export default Favoris;
