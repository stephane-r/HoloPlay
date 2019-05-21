// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchResultContainer from '../../containers/SearchResults';
import { actions } from '../../store';
import Layout from '../../components/Layout';
import SearchContainer from '../../containers/Search';
import ProfilContainer from '../../containers/Profil';
import Spacer from '../../components/Spacer';
import Title from '../../components/Title';

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
      <View style={styles.header}>
        <SearchContainer />
        <Spacer height={15} />
        <ProfilContainer navigate={navigation} />
      </View>
      <Spacer height={30} />
      <Title
        level="2"
        title="Search" />
      <Spacer height={15} />
      <SearchResultContainer onPress={loadSource} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2575f4',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingBottom: 40
  }
});

export default Dashboard;
