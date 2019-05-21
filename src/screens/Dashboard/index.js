// @flow
import React from 'react';
import SearchResultContainer from '../../containers/SearchResults';
import { actions } from '../../store';
import Layout from '../../components/Layout';
import SearchContainer from '../../containers/Search';

type Props = {
  navigation: Object
};

const Dashboard = ({ navigation }: Props) => {
  const loadSource = async (index: number) => {
    await actions.setPlaylistFrom('searchResults');
    return actions.loadSource(index);
  };

  return (
    <Layout navigate={navigation}>
      <SearchContainer />
      <SearchResultContainer onPress={loadSource} />
    </Layout>
  );
};

export default Dashboard;
