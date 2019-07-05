/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-paper';
import Video from 'react-native-video';
import config from 'react-native-config';
import MusicControl from 'react-native-music-control';
import { actions } from '../../store';
import Progress from '../Progress';
import Icon from '../Icon';
import Spacer from '../Spacer';
import Title from '../Title';
import Text from '../Text';
import ISO8601toDuration from '../../utils/ISO8601toDuration';
import youtubeDurationToSeconds from '../../utils/youtubeDurationToSeconds';

const { YOUTUBE_API_STREAM_URL } = config;

const Player = ({ source, paused, repeat, ...props }) => {
  const [currentTime, setCurrentTime] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableBackgroundMode(true);
    MusicControl.handleAudioInterruptions(true);
    MusicControl.on('play', () => actions.paused());
    MusicControl.on('pause', () => actions.paused());
    // MusicControl.on('stop', ()=>
    // this.props.dispatch(stopRemoteControl())
    // );
    MusicControl.on('nextTrack', () =>
      actions.loadSource(this.props.previousSourceIndex)
    );
    MusicControl.on('previousTrack', () =>
      actions.loadSource(this.props.previousSourceIndex)
    );
  });

  const onProgress = ({ currentTime }) => {
    setLoading(false);
    setCurrentTime(Math.round(currentTime));
  };

  const onLoadStart = () => {
    const { title, channelTitle, duration, description, thumbnails } = source;

    if (!isLoading) {
      setLoading(true);
    }

    MusicControl.setNowPlaying({
      title,
      artwork: thumbnails.medium.url,
      artist: channelTitle,
      duration: youtubeDurationToSeconds(duration),
      description
    });
  };

  const onEnd = () => {
    actions.loadSource(props.nextSourceIndex);
  };

  if (!source) {
    return null;
  }

  const uri = `https://${YOUTUBE_API_STREAM_URL}/${source.id}`;
  const percentage = Math.floor(
    (100 / youtubeDurationToSeconds(source.duration)) * currentTime
  );

  return (
    <View style={styles.panel}>
      <Button onPress={() => actions.hidePlayer()}>Close</Button>
      {isLoading && <ActivityIndicator />}
      <Video
        source={{
          uri
        }}
        audioOnly={true}
        playInBackground={true}
        paused={paused}
        repeat={repeat}
        onProgress={onProgress}
        onLoadStart={onLoadStart}
        onEnd={onEnd}
      />
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: 16
        }}>
        <Image
          source={{ uri: source.thumbnails.medium.url }}
          style={{
            width: source.thumbnails.medium.width,
            height: source.thumbnails.medium.height
          }}
        />
        <Title
          level="2"
          title={source.title} />
        <Spacer height={10} />
        <Title
          level="3"
          title={source.channelTitle} />
      </View>
      <Spacer height={40} />
      <View
        style={{
          paddingHorizontal: 16
        }}>
        <Text>{currentTime}</Text>
        <Text>{ISO8601toDuration(source.duration)}</Text>
        <Progress percentage={percentage} />
      </View>
      <Spacer height={40} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16
        }}>
        <TouchableOpacity
          onPress={() => actions.loadSource(props.previousSourceIndex)}>
          <Icon
            name="Previous"
            width={21}
            height={21} />
        </TouchableOpacity>
        <Spacer width={30} />
        <TouchableOpacity onPress={actions.paused}>
          <Icon
            name={paused ? 'Play' : 'Pause'}
            width={60}
            height={60} />
        </TouchableOpacity>
        <Spacer width={30} />
        <TouchableOpacity
          onPress={() => actions.loadSource(props.nextSourceIndex)}>
          <Icon
            name="Next"
            width={21}
            height={21} />
        </TouchableOpacity>
      </View>
      <Button
        title="Repeat"
        onPress={actions.repeat} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#6f6f76'
  },
  commandButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#292929',
    alignItems: 'center',
    margin: 7
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#292929',
    alignItems: 'center',
    marginVertical: 7
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default Player;
