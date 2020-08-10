import React, { Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import Layout from '../../components/Layout';
import Spacer from '../../components/Spacer';
import SearchbarContainer from '../../containers/Search/Bar';
import Carousel from '../../components/Carousel';
import SearchResultContainer from '../../containers/Search/Result';
import PlaceholderSearchList from '../../components/Placeholder/Search';
import PlaylistsCarouselContainer from '../../containers/Playlists/Carousel';
import CarouselSpacerContainer from '../../containers/CarouselSpacer';
import SearchPickerTypeContainer from '../../containers/Search/PickerType';
import { DASHBOARD_COLOR } from '../../../config/theme';
import ProfilContainer from '../../containers/Profil';

const DashboardScreen: React.FC = ({ route }) => {
  const { colors } = useTheme();

  return (
    <Layout setTheme={route.params.toggleTheme}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.screens.dashboard
          }
        ]}>
        <SearchbarContainer />
        <Spacer height={15} />
        <ProfilContainer />
        <Spacer height={30} />
        <PlaylistsCarouselContainer />
      </View>
      <CarouselSpacerContainer />
      <View style={styles.searchHeader}>
        <Title style={{ fontSize: 27 }}>Search</Title>
        <SearchPickerTypeContainer />
      </View>
      <Spacer height={15} />
      <Suspense fallback={<PlaceholderSearchList />}>
        <SearchResultContainer />
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
