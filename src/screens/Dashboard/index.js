// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { useQuery } from 'react-apollo-hooks';
import SearchResultContainer from '../../containers/SearchResults';
import Layout from '../../components/Layout';
import ProfilContainer from '../../containers/Profil';
import Spacer from '../../components/Spacer';
import CarouselUserPlaylists from '../../components/Carousel';
import Search from '../../components/Search';
import GET_USER from '../../graphql/query/user';

type ScreenProps = {
  userId: number
};

type DashboardProps = {
  navigation: Object,
  screenProps: ScreenProps
};

const Dashboard = ({ navigation, ...props }: DashboardProps) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      userId: props.screenProps.userId
    }
  });

  return (
    <Layout navigation={navigation}>
      <View style={styles.header}>
        <Search />
        <Spacer height={15} />
        <ProfilContainer />
        <Spacer height={30} />
        <View style={styles.carouselContainer}>
          <CarouselUserPlaylists userId={props.screenProps.userId} />
        </View>
      </View>
      <Spacer height={90} />
      <Title style={{ fontSize: 27 }}>Search</Title>
      <Spacer height={15} />
      <SearchResultContainer
        playlists={loading ? [] : data.user.playlists}
        favorisIds={loading ? [] : data.user.favorisIds}
        favoris={loading ? [] : data.user.favoris}
      />
    </Layout>
  );
};

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
