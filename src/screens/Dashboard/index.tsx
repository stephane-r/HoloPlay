import React, { memo, Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, useTheme, Text, Button } from 'react-native-paper';
import Layout from '../../components/Layout';
import Spacer from '../../components/Spacer';
import Carousel from '../../components/Carousel';
import SearchResultContainer from '../../containers/Search/Result';
import PlaylistsCarouselContainer from '../../containers/Playlists/Carousel';
import CarouselSpacerContainer from '../../containers/CarouselSpacer';
import SearchPickerTypeContainer from '../../containers/Search/PickerType';
import { DASHBOARD_COLOR } from '../../../config/theme';
import { useTranslation } from 'react-i18next';
import LastPlaysContainer from '../../containers/LastPlays';
import PlaceholderCardHorizontalList from '../../components/Placeholder/CardCenter';
import SearchPopularContainer from '../../containers/Search/Popular';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useSnackbar } from '../../providers/Snackbar';
import { ProfilContainer } from '../../containers/Profil';

const DashboardScreen: React.FC = memo(({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Layout>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.screens.dashboard
          }
        ]}>
        <Spacer height={30} />
        <ProfilContainer />
        <Spacer height={30} />
        <PlaylistsCarouselContainer />
      </View>
      <CarouselSpacerContainer />
      <LastPlaysContainer />
      <Spacer height={15} />
      <SearchPopularContainer
        title={t('search.popular')}
        setPlaylistFrom="popular"
        apiUrl="popular"
      />
      <Spacer height={15} />
      <SearchPopularContainer
        title={t('search.trending')}
        setPlaylistFrom="trending"
        apiUrl="trending"
      />
    </Layout>
  );
});

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
