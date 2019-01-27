import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Input } from '@youtube-audio-player/components';
import { actions, SearchResultContainer } from '@youtube-audio-player/core';
import AudioContainer from '../../containers/Audio';

class Dashboard extends React.Component {
  static path = 'dashboard';

  static navigationOptions = () => ({
    title: 'Dashboard',
    linkName: 'Dashboard'
  });

  componentDidMount() {
    actions.search();
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          onChangeText={text => actions.setSearchValue(text)}
          placeholder="Rechercher..."
        />
        <Button
          title="Search"
          onPress={actions.search} />
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
