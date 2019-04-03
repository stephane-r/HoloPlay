// @flow
import React from 'react';
import { View, Button } from 'react-native';
import { Input } from '@youtube-audio-player/components';
import { actions } from '@youtube-audio-player/core';

type Props = {
  navigation: Object
};

type State = {
  identifier: string,
  password: string
};

class Login extends React.Component<Props, State> {
  static path = '';

  static navigationOptions = () => ({
    title: 'Login',
    linkName: 'Login'
  });

  constructor(props: Object) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  state = {
    identifier: 'contact@stephane-richin.fr',
    password: 'azerty'
  };

  handleChange: Function;
  async handleChange(key: string, value: string) {
    await this.setState({
      [key]: value
    });
  }

  login: Function;
  async login() {
    await actions.loginThroughApi(this.state);
    await actions.setConnected();
    await actions.search();
    return this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (
      <View>
        <Input
          onChangeText={value => this.handleChange('identifier', value)}
          placeholder="identifierr"
          value={this.state.identifier}
        />
        <Input
          onChangeText={value => this.handleChange('password', value)}
          placeholder="Passwordd"
          value={this.state.password}
        />
        <Button
          title="Login"
          onPress={this.login} />
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate('Register')}
        />
      </View>
    );
  }
}

export default Login;
