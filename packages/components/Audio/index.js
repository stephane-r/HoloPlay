import React from 'react';
import Video from 'react-native-video';
import { View, Text } from 'react-native';

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
            source={{ uri: `http://192.168.1.102:8080/${source.id}` }}
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
        </View>
      );
    }

    return <Text>Test</Text>;
  }
}

export default Audio;
