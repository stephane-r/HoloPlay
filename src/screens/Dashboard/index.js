// @flow
import React from 'react';
import { Button } from 'react-native';
import Input from '../../components/Forms/Input';
import SearchResultContainer from '../../containers/SearchResults';
import { actions } from '../../store';
import Layout from '../../components/Layout';

type Props = {
  navigation: Object
};

class Dashboard extends React.Component<Props> {
  loadSource: Function;
  async loadSource(index: number) {
    await actions.setPlaylistFrom('searchResults');
    return actions.loadSource(index);
  }

  render() {
    return (
      <Layout navigate={this.props.navigation}>
        <Input
          onChangeText={text => actions.setSearchValue(text)}
          placeholder="Rechercher..."
        />
        <Button
          title="Search"
          onPress={actions.search} />
        <SearchResultContainer onPress={this.loadSource} />
      </Layout>
    );
  }
}

export default Dashboard;
