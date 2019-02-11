/* eslint react/prop-types: 0 */
import React from 'react';
import Video from 'react-native-video';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  YOUTUBE_API_STREAM_URL,
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

  componentDidMount() {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);

    MusicControl.enableBackgroundMode(true);

    MusicControl.handleAudioInterruptions(true);

    MusicControl.on('play', () => actions.paused());
    MusicControl.on('pause', () => actions.paused());

    // MusicControl.on('stop', ()=> {
    // this.props.dispatch(stopRemoteControl());
    // })

    MusicControl.on('nextTrack', () =>
      actions.loadSource(this.props.previousSourceIndex)
    );
    MusicControl.on('previousTrack', () =>
      actions.loadSource(this.props.previousSourceIndex)
    );
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

  seek(seconds = 100) {
    this.player.seek(seconds);
  }

  render() {
    const { source, paused, repeat } = this.props;

    if (source) {
      const percentage = Math.floor(
        (100 / youtubeDurationToSeconds(source.duration)) *
          this.state.currentTime
      );

      return (
        <View style={styles.container}>
          <Video
            source={{
              uri: `https://${YOUTUBE_API_STREAM_URL}/chunk/${source.id}`
            }}
            audioOnly={true}
            playInBackground={true}
            paused={paused}
            poster="https://baconmockup.com/300/200/"
            repeat={repeat}
            onProgress={this.onProgress}
            onLoadStart={this.onLoadStart}
            ref={player => (this.player = player)}
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
          <Button
            title="Seek"
            style={{ width: '100%' }}
            onPress={this.seek} />
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexWrap: 'wrap'
  }
});

export default Audio;
