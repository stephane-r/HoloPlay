import React, { Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, useTheme, Text } from 'react-native-paper';
import Layout from '../../components/Layout';
import Spacer from '../../components/Spacer';
import SearchbarContainer from '../../containers/Search/Bar';
import Carousel from '../../components/Carousel';
import SearchResultContainer from '../../containers/Search/Result';
import PlaylistsCarouselContainer from '../../containers/Playlists/Carousel';
import CarouselSpacerContainer from '../../containers/CarouselSpacer';
import SearchPickerTypeContainer from '../../containers/Search/PickerType';
import { DASHBOARD_COLOR } from '../../../config/theme';
import ProfilContainer from '../../containers/Profil';
import { useTranslation } from 'react-i18next';
import LastPlaysContainer from '../../containers/LastPlays';
import PlaceholderCardHorizontalList from '../../components/Placeholder/CardCenter';
import SearchPopularContainer from '../../containers/Search/Popular';
import ErrorBoundary from '../../components/ErrorBoundary';

const DashboardScreen: React.FC = ({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Layout setTheme={route.params.toggleTheme}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.screens.dashboard
          }
        ]}>
        <SearchbarContainer showButtonHistory />
        <Spacer height={15} />
        <ProfilContainer />
        <Spacer height={30} />
        <PlaylistsCarouselContainer />
      </View>
      <CarouselSpacerContainer />
      <LastPlaysContainer />
      <Spacer height={15} />
      <Title style={{ fontSize: 27 }}>{t('search.popular')}</Title>
      <SearchPopularContainer setPlaylistFrom="popular" apiUrl="popular" />
      <Spacer height={15} />
      <Title style={{ fontSize: 27 }}>{t('search.trending')}</Title>
      <SearchPopularContainer setPlaylistFrom="trending" apiUrl="trending" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: -16,
    paddingHorizontal: 16
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default DashboardScreen;
