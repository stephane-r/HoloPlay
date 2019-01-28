import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    setTimeout(() => this.props.navigation.navigate('Login'), 1000);
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
