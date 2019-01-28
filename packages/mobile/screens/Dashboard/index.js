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
import { Input } from '@youtube-audio-player/components';
import { actions, SearchResultContainer } from '@youtube-audio-player/core';

type Props = {
  navigation: Object
};

class Dashboard extends React.Component<Props> {
  constructor(props: Object) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // TODO: remove timeout and wait load user informations before run this action
    setTimeout(() => actions.search(), 1000);
  }

  logout: Function;
  async logout() {
    await actions.logout();
    return this.props.navigation.navigate('Login');
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
          <SearchResultContainer onPress={index => actions.loadSource(index)} />
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
