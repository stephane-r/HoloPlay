import React from 'react';
import { Text } from 'react-native-paper';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(): void {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <Text>Oops, something went wrong!</Text>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
