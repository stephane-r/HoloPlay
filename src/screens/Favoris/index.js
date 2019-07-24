// @flow
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Text } from 'react-native-paper';
import { actions } from '../../store';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import ResultList from '../../components/Result/List';
import GET_FAVORIS_IDS from '../../graphql/query/favorisIds';

type ScreenProps = {
  userId: number
};

type FavorisProps = {
  navigation: Object,
  screenProps: ScreenProps
};

const Favoris = ({ navigation, ...props }: FavorisProps) => {
  const loadSource = async index => {
    await actions.setPlaylistFrom('favoris');
    return actions.loadSource(index);
  };

  const { data, loading } = useQuery(GET_FAVORIS_IDS, {
    variables: { userId: props.screenProps.userId }
  });

  return (
    <Layout navigation={navigation}>
      <Header
        title="Favoris"
        backgroundColor="#EE05F2" />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ResultList
          data={data.user.favoris}
          favorisIds={data.user.favorisIds}
          favoris={data.user.favoris}
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
