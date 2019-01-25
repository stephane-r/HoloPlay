import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Input } from '@youtube-audio-player/components';
// import { Link } from '@react-navigation/core';
import { actions, SearchResultContainer } from '@youtube-audio-player/core';
import AudioContainer from '../../containers/Audio';

class Dashboard extends React.Component {
  static path = 'dashboard';

  static navigationOptions = () => ({
    title: 'Dashboard',
    linkName: 'Dashboard'
  });

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  UNSAFE_componentWillReceiveProps({ isConnected }) {
    if (isConnected) {
      actions.search();
    }
  }

  async logout() {
    await actions.logout();
    return this.props.navigation.navigate('LoginScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        {/* <Link routeName="DashboardScreen">Dashboard</Link> */}
        <Input
          onChangeText={text => actions.setSearchValue(text)}
          placeholder="Rechercher..."
        />
        <Button title="Search" onPress={actions.search} />
        <SearchResultContainer onPress={index => actions.loadSource(index)} />
        <AudioContainer />
      </View>
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
