/* eslint react/prop-types: 0 */
/* eslint no-unused-vars: 0 */
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  YOUTUBE_API_STREAM_URL,
  actions,
  ISO8601toDuration,
  youtubeDurationToSeconds
} from '@youtube-audio-player/core';
import { Progress } from '@youtube-audio-player/components';
import ReactPlayer from 'react-player';

class Audio extends React.Component {
  state = {
    currentTime: null,
    playing: true
  };

  render() {
    const { source, paused, repeat } = this.props;

    if (source) {
      const percentage = Math.floor(
        (100 / youtubeDurationToSeconds(source.duration)) *
          this.state.currentTime
      );

      return (
        <View style={styles.container}>
          <ReactPlayer
            url={`https://${YOUTUBE_API_STREAM_URL}/${source.id}`}
            playing={this.state.playing}
          />
          <Text>{this.state.currentTime}</Text>
          <Text>{ISO8601toDuration(source.duration)}</Text>
          <Progress percentage={percentage} />
          <Button
            title="Next"
            onPress={() => actions.loadSource(this.props.nextSourceIndex)}
          />
          <Button
            title="Previous"
            onPress={() => actions.loadSource(this.props.previousSourceIndex)}
          />
          <Button
            title="Pause"
            onPress={actions.paused} />
          <Button
            title="Repeat"
            onPress={actions.repeat} />
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  }
});

export default Audio;
