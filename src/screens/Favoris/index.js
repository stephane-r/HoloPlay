// @flow
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Text } from 'react-native-paper';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import ResultList from '../../components/Result/List';
import GET_USER from '../../graphql/query/user';
import DataEmpty from '../../components/Data/Empty';

type ScreenProps = {
  userId: number
};

type FavorisProps = {
  navigation: Object,
  screenProps: ScreenProps
};

const Favoris = ({ navigation, ...props }: FavorisProps) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { userId: props.screenProps.userId }
  });

  return (
    <Layout navigation={navigation}>
      <Header
        title="Favoris"
        backgroundColor="#EE05F2" />
      {loading ? (
        <Text>Loading...</Text>
      ) : data.user.favoris.length === 0 ? (
        <DataEmpty text="No favoris." />
      ) : (
        <ResultList
          data={data.user.favoris}
          favorisIds={data.user.favorisIds}
          favoris={data.user.favoris}
          playlists={data.user.playlists}
          setPlaylistFrom={data.user.favoris}
          isFavoris
        />
      )}
    </Layout>
  );
};

Favoris.path = 'favoris';

Favoris.navigationOptions = () => ({
  title: 'Favoris',
  linkName: 'Favoris'
});

export default Favoris;
