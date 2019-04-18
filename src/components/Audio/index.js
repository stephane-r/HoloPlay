/* eslint react/prop-types: 0 */
import React from 'react';
import Video from 'react-native-video';
import { YOUTUBE_API_STREAM_URL } from 'react-native-config';
import { View, Text, Button, StyleSheet } from 'react-native';
import MusicControl from 'react-native-music-control';
import { actions } from '../../store';
import Progress from '../Progress';
import ISO8601toDuration from '../../utils/ISO8601toDuration';
import youtubeDurationToSeconds from '../../utils/youtubeDurationToSeconds';

class Audio extends React.Component {
  state = {
    currentTime: null
  };

  constructor(props) {
    super(props);
    this.onProgress = this.onProgress.bind(this);
    this.onLoadStart = this.onLoadStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
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

  onEnd() {
    actions.loadSource(this.props.nextSourceIndex);
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
              uri: `https://${YOUTUBE_API_STREAM_URL}/${source.id}`
            }}
            audioOnly={true}
            playInBackground={true}
            paused={paused}
            repeat={repeat}
            onProgress={this.onProgress}
            onLoadStart={this.onLoadStart}
            onEnd={this.onEnd}
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
