import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import Input from './components/Forms/Input';
import {
  Provider,
  actions,
  SearchResultContainer,
  AudioContainer
} from '@youtube-audio-player/core';

export default class App extends Component {
  state = {
    text: 'Eminem'
  };

  render() {
    return (
      <Provider>
        <ScrollView>
          <View style={styles.container}>
            <Input
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
            <Button
              title="Search"
              onPress={() => actions.search(this.state.text)}
            />
            <SearchResultContainer />
            <AudioContainer />
            <Button title="Pause" onPress={actions.paused} />
            <Button title="Repeat" onPress={actions.repeat} />
          </View>
        </ScrollView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
