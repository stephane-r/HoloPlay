import React, { Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import Layout from '../../components/Layout';
import Spacer from '../../components/Spacer';
import SearchbarContainer from '../../containers/Search/Bar';
import Carousel from '../../components/Carousel';
import SearchPopular from '../../components/Search/Popular';
import SearchTop from '../../components/Search/Top';
import SearchResultContainer from '../../containers/Search/Result';
import PlaylistsCarouselContainer from '../../containers/Playlists/Carousel';
import CarouselSpacerContainer from '../../containers/CarouselSpacer';
import SearchPickerTypeContainer from '../../containers/Search/PickerType';
import { DASHBOARD_COLOR } from '../../../config/theme';
import ProfilContainer from '../../containers/Profil';
import { useTranslation } from 'react-i18next';
import LastPlaysContainer from '../../containers/LastPlays';
import PlaceholderCardHorizontalList from '../../components/Placeholder/CardCenter';

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
      <Suspense fallback={<PlaceholderCardHorizontalList />}>
        <Title style={{ fontSize: 27 }}>{t('search.popular')}</Title>
        <SearchPopular setPlaylistFrom="popular" apiUrl="popular" />
      </Suspense>
      <Spacer height={15} />
      <Suspense fallback={<PlaceholderCardHorizontalList />}>
        <Title style={{ fontSize: 27 }}>{t('search.trending')}</Title>
        <SearchPopular setPlaylistFrom="trending" apiUrl="trending" />
      </Suspense>
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
