import React from 'react';
import { Provider } from '@youtube-audio-player/core';
import App from './components/App';

class AppContainer extends React.Component {
  render() {
    return (
      <Provider>
        <App />
      </Provider>
    );
  }
}

export default AppContainer;
