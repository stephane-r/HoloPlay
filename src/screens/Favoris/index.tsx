import React from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { FavorisPlaylistContainer } from '../../containers/Favoris/Playlist';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const Favoris: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Layout>
      <Header title={t('navigation.favoris')} backgroundColor={colors.screens.favoris} />
      <FavorisPlaylistContainer />
    </Layout>
  );
};

export default Favoris;
