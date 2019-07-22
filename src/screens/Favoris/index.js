// @flow
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { actions } from '../../store';
import FavorisContainer from '../../containers/Favoris';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import GET_USER from '../../graphql/query/me';

type FavorisProps = {
  navigation: Object
};

const Favoris = ({ navigation }: FavorisProps) => {
  const loadSource = async index => {
    await actions.setPlaylistFrom('favoris');
    return actions.loadSource(index);
  };
  const { data } = useQuery(GET_USER);

  return (
    <Layout navigation={navigation}>
      <Header
        title="Favoris"
        backgroundColor="#EE05F2" />
      <FavorisContainer
        userId={data.userMe.id}
        onPress={loadSource} />
    </Layout>
  );
};

Favoris.path = 'favoris';

Favoris.navigationOptions = () => ({
  title: 'Favoris',
  linkName: 'Favoris'
});

export default Favoris;
