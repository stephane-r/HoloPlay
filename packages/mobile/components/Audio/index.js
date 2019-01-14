import React from 'react';
import Video from 'react-native-video';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  API_URL,
  actions,
  ISO8601toDuration,
  youtubeDurationToSeconds
} from '@youtube-audio-player/core';
import { Progress } from '@youtube-audio-player/components';
import MusicControl from 'react-native-music-control';

class Audio extends React.Component {
  state = {
    currentTime: null
  };

  constructor(props) {
    super(props);
    this.onProgress = this.onProgress.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
  }

  onProgress({ currentTime }) {
    this.setState({
      currentTime: Math.round(currentTime)
    });
  }

  onLoadStart() {
    const {
      title,
      channelTitle,
      duration,
      description,
      thumbnails
    } = this.props.source;

    MusicControl.setNowPlaying({
      title,
      artwork: thumbnails.medium.url,
      artist: channelTitle,
      duration: youtubeDurationToSeconds(duration),
      description
    });
  }

  render() {
    const { source, sourceIndex, paused, repeat } = this.props;

    const nextSourceIndex = sourceIndex + 1;
    const previousSourceIndex = sourceIndex - 1;

    if (source) {
      const percentage = Math.floor(
        (100 / youtubeDurationToSeconds(source.duration)) *
          this.state.currentTime
      );

      return (
        <View style={styles.container}>
          <Video
            source={{ uri: `http://${API_URL}/${source.id}` }}
            audioOnly={true}
            playInBackground={true}
            paused={paused}
            poster="https://baconmockup.com/300/200/"
            repeat={repeat}
            onProgress={this.onProgress}
            onLoadStart={this.onLoadStart}
          />
          <Text>{this.state.currentTime}</Text>
          <Text>{ISO8601toDuration(source.duration)}</Text>
          <Progress percentage={percentage} />
          <Button
            title="Next"
            onPress={() => actions.loadSource(nextSourceIndex)}
          />
          <Button
            title="Previous"
            onPress={() => actions.loadSource(previousSourceIndex)}
          />
          <Button title="Pause" onPress={actions.paused} />
          <Button title="Repeat" onPress={actions.repeat} />
        </View>
      );
    }

    return <Text>Test</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  }
});

export default Audio;
