// @flow
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  actions,
  ISO8601toDuration,
  youtubeDurationToSeconds
} from '@youtube-audio-player/core';
import { Progress } from '@youtube-audio-player/components';
import ReactPlayer from 'react-player';

type Props = {
  source: Object,
  paused: boolean,
  nextSourceIndex: Function,
  previousSourceIndex: Function
};

type State = {
  currentTime: number,
  playing: boolean,
  percentage: number,
  repeat: boolean
};

class Audio extends React.Component<Props, State> {
  state = {
    currentTime: 0,
    playing: true,
    percentage: 0,
    repeat: false
  };

  constructor(props: Object) {
    super(props);
    this.onEnded = this.onEnded.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.loadNextSource = this.loadNextSource.bind(this);
    this.loadPreviousSource = this.loadPreviousSource.bind(this);
  }

  onEnded: Function;
  onEnded() {
    const { repeat } = this.state;

    if (repeat) {
      alert('repeat');
    }

    return this.loadNextSource();
  }

  onProgress: Function;
  onProgress({ playedSeconds }: Object) {
    const percentage = Math.floor(
      (100 / youtubeDurationToSeconds(this.props.source.duration)) *
        Math.round(playedSeconds)
    );

    return this.setState({
      currentTime: Math.round(playedSeconds),
      percentage
    });
  }

  loadNextSource: Function;
  loadNextSource() {
    return actions.loadSource(this.props.nextSourceIndex);
  }

  loadPreviousSource: Function;
  loadPreviousSource() {
    return actions.loadSource(this.props.previousSourceIndex);
  }

  render() {
    const { source, paused } = this.props;
    const { percentage } = this.state;

    if (source) {
      return (
        <View style={styles.container}>
          <ReactPlayer
            url={`https://${process.env.YOUTUBE_API_STREAM_URL}/${source.id}`}
            playing={!paused}
            onEnded={this.onEnded}
            onProgress={this.onProgress}
          />
          <Text>{this.state.currentTime}</Text>
          <Text>{ISO8601toDuration(source.duration)}</Text>
          <Progress percentage={percentage} />
          <Button
            title="Next"
            onPress={this.loadNextSource} />
          <Button
            title="Previous"
            onPress={this.loadPreviousSource} />
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
