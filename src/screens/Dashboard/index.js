// @flow
import React from 'react';
import {
  ScrollView,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import Input from '../../components/Forms/Input';
import SearchResultContainer from '../../containers/SearchResults';
import { actions } from '../../store';

type Props = {
  navigation: Object
};

class Dashboard extends React.Component<Props> {
  constructor(props: Object) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout: Function;
  async logout() {
    await actions.logout();
    return this.props.navigation.navigate('Login');
  }

  loadSource: Function;
  async loadSource(index: number) {
    await actions.setPlaylistFrom('searchResults');
    return actions.loadSource(index);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
          <Input
            onChangeText={text => actions.setSearchValue(text)}
            placeholder="Rechercher..."
          />
          <Button
            title="Search"
            onPress={actions.search} />
          <SearchResultContainer onPress={this.loadSource} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default Dashboard;
