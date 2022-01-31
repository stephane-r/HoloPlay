import React from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import FavorisPlaylistContainer from '../../containers/Favoris/Playlist';
import { FAVORIS_COLOR } from '../../../config/theme';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const Favoris: React.FC = ({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Layout setTheme={route.params.toggleTheme}>
      <Header
        title={t('navigation.favoris')}
        backgroundColor={colors.screens.favoris}
      />
      <FavorisPlaylistContainer />
    </Layout>
  );
};

export default Favoris;
