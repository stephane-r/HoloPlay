// @flow
import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { actions } from '../../store';

type Props = {
  navigation: Object
};

type State = {
  username: string,
  email: string,
  password: string
};

class Register extends React.Component<Props, State> {
  static navigationOptions = () => ({
    title: 'Register',
    linkName: 'Register'
  });

  constructor(props: Object) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  state = {
    username: '',
    email: '',
    password: ''
  };

  handleChange: Function;
  async handleChange(key: string, value: string) {
    await this.setState({
      [key]: value
    });
  }

  register: Function;
  async register() {
    await actions.registerThroughApi(this.state);
    return this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={value => this.handleChange('username', value)}
          placeholder="username"
          value={this.state.username}
        />
        <TextInput
          onChangeText={value => this.handleChange('email', value)}
          placeholder="email"
          value={this.state.email}
        />
        <TextInput
          onChangeText={value => this.handleChange('password', value)}
          placeholder="Password"
          value={this.state.password}
        />
        <Button onPress={this.register}>Register</Button>
      </View>
    );
  }
}

export default Register;
