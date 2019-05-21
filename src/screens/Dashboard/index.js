// @flow
import React from 'react';
import SearchResultContainer from '../../containers/SearchResults';
import { actions } from '../../store';
import Layout from '../../components/Layout';
import SearchContainer from '../../containers/Search';
import ProfilContainer from '../../containers/Profil';
import Spacer from '../../components/Spacer';

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
      <Spacer height={15} />
      <ProfilContainer navigate={navigation} />
      <Spacer height={15} />
      <SearchResultContainer onPress={loadSource} />
    </Layout>
  );
};

export default Dashboard;
