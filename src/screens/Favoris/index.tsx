import React from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { useTheme } from 'react-native-paper';
import { FavorisList } from '../../components/Favoris/List';
import { useTranslation } from 'react-i18next';

const Favoris: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Layout>
      <Header title={t('navigation.favoris')} backgroundColor={colors.screens.favoris} />
      <FavorisList />
    </Layout>
  );
};

export default Favoris;
