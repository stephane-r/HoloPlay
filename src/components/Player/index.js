/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Text, Headline, IconButton, ProgressBar } from 'react-native-paper';
import Video from 'react-native-video';
import config from 'react-native-config';
import MusicControl from 'react-native-music-control';
import { actions } from '../../store';
import Spacer from '../Spacer';
import ISO8601toDuration from '../../utils/ISO8601toDuration';
import youtubeDurationToSeconds from '../../utils/youtubeDurationToSeconds';

// @flow
const { YOUTUBE_API_STREAM_URL } = config;

type PlayerProps = {
  source: Object,
  paused: boolean,
  repeat: boolean,
  previousSourceIndex: Function,
  nextSourceIndex: Function
};

const Player = ({ source, paused, repeat, ...props }: PlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableBackgroundMode(true);
    MusicControl.handleAudioInterruptions(true);
    MusicControl.on('play', actions.paused);
    MusicControl.on('pause', actions.paused);
    MusicControl.on('stop', actions.paused);
    MusicControl.on('nextTrack', () =>
      actions.loadSource(props.previousSourceIndex)
    );
    MusicControl.on('previousTrack', () =>
      actions.loadSource(props.previousSourceIndex)
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
    <View style={styles.container}>
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
      {/* {isLoading && <ActivityIndicator />} */}
      <Spacer height={10} />
      <IconButton
        icon="keyboard-arrow-left"
        size={30}
        onPress={actions.hidePlayer}
      />
      <Spacer height={40} />
      <View style={styles.head}>
        <Image
          source={{ uri: source.thumbnails.medium.url }}
          style={{
            width: source.thumbnails.medium.width,
            height: source.thumbnails.medium.height
          }}
        />
        <Spacer height={30} />
        <Headline numberOfLines={1}>{source.title}</Headline>
        <Spacer height={10} />
        <Text>{source.channelTitle}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.progress}>
          <Text>{currentTime ? currentTime : '00:00'}</Text>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <ProgressBar
              progress={percentage}
              color="#2575f4" />
          </View>
          <Text>{ISO8601toDuration(source.duration)}</Text>
          <Spacer height={60} />
        </View>
        <IconButton
          icon="repeat"
          size={30}
          onPress={actions.repeat} />
        <Spacer width={10} />
        <IconButton
          icon="skip-previous"
          onPress={() => actions.loadSource(props.previousSourceIndex)}
          size={30}
        />
        <Spacer width={30} />
        <IconButton
          icon={paused ? 'pause-circle-outline' : 'play-circle-outline'}
          onPress={() => actions.loadSource(paused)}
          style={{ width: 80, margin: 0 }}
          size={80}
          animated
        />
        <Spacer width={20} />
        <IconButton
          icon="skip-next"
          onPress={() => actions.loadSource(props.nextSourceIndex)}
          size={30}
        />
        <Spacer width={10} />
        <IconButton
          icon="favorite-border"
          size={30}
          onPress={actions.repeat} />
      </View>
      <Spacer height={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get('window').height - 50
  },
  head: {
    alignItems: 'center',
    paddingHorizontal: 16,
    flex: 1
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexWrap: 'wrap'
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 40
  }
});

export default Player;
