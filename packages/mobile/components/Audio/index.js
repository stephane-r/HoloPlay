import React from 'react';
import Video from 'react-native-video';
import { View, Text, Button } from 'react-native';
import { API_URL, actions } from '@youtube-audio-player/core';

class Audio extends React.Component {
  state = {
    currentTime: 0,
    playableDuration: 0,
    seekableDuration: 0
  };

  render() {
    const { source, paused, repeat } = this.props;

    if (source) {
      return (
        <View>
          <Video
            source={{ uri: `http://${API_URL}/${source.id}` }}
            audioOnly={true}
            playInBackground={true}
            paused={paused}
            poster="https://baconmockup.com/300/200/"
            repeat={repeat}
            onProgress={({ currentTime, playableDuration, seekableDuration }) =>
              this.setState({
                currentTime,
                playableDuration,
                seekableDuration
              })
            }
          />
          <Text>{this.state.currentTime}</Text>
          <Text>{this.state.playableDuration}</Text>
          <Text>{this.state.seekableDuration}</Text>
          <Button title="Pause" onPress={actions.paused} />
          <Button title="Repeat" onPress={actions.repeat} />
        </View>
      );
    }

    return <Text>Test</Text>;
  }
}

export default Audio;
