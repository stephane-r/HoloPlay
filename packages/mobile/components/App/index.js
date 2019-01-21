import React from 'react';
import { Provider } from '@youtube-audio-player/core';
import SwitchNavigator from '../../navigation/SwitchNavigator';

class App extends React.Component {
  render() {
    return (
      <Provider>
        <SwitchNavigator />
      </Provider>
    );
  }
}

export default App;
