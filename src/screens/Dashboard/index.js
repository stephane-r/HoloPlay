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
import type { ScreenProps } from '../../types';
import GET_USER from '../../graphql/query/user';
import SearchContainer from '../../containers/Search';

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

  const userPlaylistsEmpty = !loading && data.user.playlists.length === 0;
  const carouselContainerStyles = {
    marginBottom: userPlaylistsEmpty ? 0 : -60
  };

  return (
    <Layout navigation={navigation}>
      <View style={styles.header}>
        <SearchContainer />
        <Spacer height={15} />
        <ProfilContainer />
        <Spacer height={30} />
        <View style={carouselContainerStyles}>
          <CarouselUserPlaylists userId={props.screenProps.userId} />
        </View>
      </View>
      <Spacer height={userPlaylistsEmpty ? 30 : 90} />
      <Title style={{ fontSize: 27 }}>Search</Title>
      <Spacer height={15} />
      {!loading && (
        <SearchResultContainer
          playlists={data.user.playlists}
          favorisIds={data.user.favorisIds}
          favoris={data.user.favoris}
          setPlaylistFrom="searchResults"
        />
      )}
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
