// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import SearchResultContainer from '../../containers/SearchResults';
import Layout from '../../components/Layout';
import ProfilContainer from '../../containers/Profil';
import Spacer from '../../components/Spacer';
import CarouselUserPlaylistContainer from '../../containers/CarouselUserPlaylist';
import Search from '../../components/Search';

type DashboardProps = {
  navigation: Object
};

const Dashboard = ({ navigation }: DashboardProps) => (
  <Layout navigate={navigation}>
    <View style={styles.header}>
      <Search />
      <Spacer height={15} />
      <ProfilContainer navigate={navigation} />
      <Spacer height={30} />
      <View style={styles.carouselContainer}>
        <CarouselUserPlaylistContainer />
      </View>
    </View>
    <Spacer height={90} />
    <Title style={{ fontSize: 27 }}>Search</Title>
    <Spacer height={15} />
    <SearchResultContainer />
  </Layout>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2575f4',
    marginHorizontal: -16,
    paddingHorizontal: 16
  },
  carouselContainer: {
    marginBottom: -60
  }
});

export default Dashboard;
