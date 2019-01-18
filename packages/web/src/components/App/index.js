import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import { Input } from '@youtube-audio-player/components';
import {
  Provider,
  actions,
  SearchResultContainer
} from '@youtube-audio-player/core';
import AudioContainer from '../../containers/Audio';

class App extends Component {
  state = {
    identifier: 'contact@stephane-richin.fr',
    password: 'steph0407'
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    actions.search();
  }

  async handleChange(key, value) {
    await this.setState({
      [key]: value
    });

    console.log(this.state);
  }

  render() {
    return (
      <Provider>
        <ScrollView>
          <View>
            <Input
              onChangeText={value => this.handleChange('identifier', value)}
              placeholder="identifier"
              value={this.state.identifier}
            />
            <Input
              onChangeText={value => this.handleChange('password', value)}
              placeholder="Password"
              value={this.state.password}
            />
            <Button
              title="Login"
              onPress={() => actions.loginThroughApi(this.state)}
            />
          </View>
          <View style={styles.container}>
            <Input
              onChangeText={text => actions.setSearchValue(text)}
              placeholder="Rechercher..."
            />
            <Button title="Search" onPress={actions.search} />
            <SearchResultContainer
              onPress={index => actions.loadSource(index)}
            />
            <AudioContainer />
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

export default App;
