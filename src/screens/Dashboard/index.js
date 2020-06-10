// @flow
import React, { Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import Layout from '../../components/Layout';
import Spacer from '../../components/Spacer';
import type { ScreenProps } from '../../types';
import SearchContainer from '../../containers/Search';
import Profil from '../../components/Profil';
import Carousel from '../../components/Carousel';
import PlaceholderCarousel from '../../components/Placeholder/Carousel';
import SearchResultContainer from '../../containers/SearchResults';
import PlaceholderSearchList from '../../components/Placeholder/Search';
import PlaylistsCarouselContainer from '../../containers/PlaylistsCarousel';

type DashboardProps = {
  navigation: Object,
  screenProps: ScreenProps
};

const Dashboard = ({ navigation }: DashboardProps) => {
  const userPlaylistsEmpty = false;
  const carouselContainerStyles = {
    marginBottom: userPlaylistsEmpty ? 0 : -60
  };

  return (
    <Layout navigation={navigation}>
      <View style={styles.header}>
        <SearchContainer />
        <Spacer height={15} />
        <Profil />
        <Spacer height={30} />
        <View style={carouselContainerStyles}>
          <PlaylistsCarouselContainer />
        </View>
      </View>
      <Spacer height={userPlaylistsEmpty ? 30 : 90} />
      <Title style={{ fontSize: 27 }}>Search</Title>
      <Spacer height={15} />
      <Suspense fallback={<PlaceholderSearchList />}>
        <SearchResultContainer setPlaylistFrom="searchResults" />
      </Suspense>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2575f4',
    marginHorizontal: -16,
    paddingHorizontal: 16
  }
});

export default Dashboard;
