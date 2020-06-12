import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import {
  Text,
  Headline,
  IconButton,
  ProgressBar,
  ActivityIndicator
} from 'react-native-paper';
import Video from 'react-native-video';
import MusicControl from 'react-native-music-control';
// @ts-ignore
import TimeFormat from 'hh-mm-ss';
import { actions } from '../../store';
import Spacer from '../Spacer';
import ISO8601toDuration from '../../utils/ISO8601toDuration';
import FavorisButtonContainer from '../../containers/Favoris/Button';
import { Video as VideoType } from '../../types';

interface Props {
  source: VideoType;
  paused: boolean;
  repeat: boolean;
  previousSourceIndex: () => void;
  nextSourceIndex: () => void;
}

const Player: React.FC<Props> = ({ source, paused, repeat, ...props }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const player = useRef(null);

  useEffect(() => {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableBackgroundMode(true);
    // MusicControl.handleAudioInterruptions(true);
    // @ts-ignore
    MusicControl.on('play', actions.paused);
    // @ts-ignore
    MusicControl.on('pause', actions.paused);
    // @ts-ignore
    MusicControl.on('stop', actions.paused);
    MusicControl.on(
      // @ts-ignore
      'nextTrack',
      () => props.nextSourceIndex && actions.loadSource(props.nextSourceIndex)
    );
    MusicControl.on(
      // @ts-ignore
      'previousTrack',
      (): void =>
        props.previousSourceIndex &&
        actions.loadSource(props.previousSourceIndex)
    );
  }, [source]);

  const onProgress = ({ currentTime }: { currentTime: number }): void => {
    setLoading(false);
    setCurrentTime(Math.round(currentTime));
  };

  const onLoadStart = (): void => {
    const { title, author, lengthSeconds, thumbnail } = source;

    if (!isLoading) {
      setLoading(true);
    }

    MusicControl.setNowPlaying({
      title,
      artwork: thumbnail.url,
      artist: author,
      duration: lengthSeconds,
      description: 'TODO'
    });
  };

  const onEnd = (): void => {
    if (props.nextSourceIndex) {
      actions.loadSource(props.nextSourceIndex);
    }
  };

  const onError = (): void => {
    setLoading(false);
    actions.setFlashMessage('Error from Stream API');
  };

  if (!source) {
    return null;
  }

  const duration = source.lengthSeconds;
  const percentage = Math.floor((100 / duration) * currentTime);

  return (
    <View style={styles.container}>
      <Video
        ref={player}
        source={{
          uri: source.uri
        }}
        audioOnly={true}
        playInBackground={true}
        paused={paused}
        repeat={repeat}
        onProgress={onProgress}
        onLoadStart={onLoadStart}
        onEnd={onEnd}
        onError={onError}
      />
      <Spacer height={10} />
      <IconButton
        accessibilityStates={[]}
        icon="chevron-left"
        size={30}
        onPress={actions.hidePlayer}
      />
      <Spacer height={40} />
      <View style={styles.head}>
        <View>
          {isLoading && (
            <ActivityIndicator accessibilityStates={[]} style={styles.loader} />
          )}
          <Image
            source={{ uri: source.thumbnail.url }}
            style={{
              width: source.thumbnail.width,
              height: source.thumbnail.height
            }}
          />
        </View>
        <Spacer height={30} />
        <Headline numberOfLines={2}>{source.title}</Headline>
        <Spacer height={10} />
        <Text accessibilityStates={[]}>source.channelTitle</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.progress}>
          <Text accessibilityStates={[]}>
            {currentTime
              ? TimeFormat.fromS(
                  currentTime,
                  duration > 3600 ? 'hh:mm:ss' : 'mm:ss'
                )
              : '00:00'}
          </Text>
          <View style={styles.progressBar}>
            <ProgressBar
              accessibilityStates={[]}
              progress={percentage / 100}
              color="#2575f4"
            />
          </View>
          <Text accessibilityStates={[]}>{source.lengthSeconds}</Text>
          <Spacer height={30} />
        </View>
        <Spacer width={10} />
        <IconButton
          accessibilityStates={[]}
          icon={repeat ? 'repeat-one' : 'repeat'}
          size={25}
          onPress={actions.repeat}
          animated
        />
        <View style={styles.actionsContainer}>
          <IconButton
            accessibilityStates={[]}
            icon="skip-previous"
            onPress={() => actions.loadSource(props.previousSourceIndex)}
            size={30}
          />
          <IconButton
            accessibilityStates={[]}
            icon="rewind-30"
            // @ts-ignore
            onPress={() => player.current?.seek(30)}
            size={30}
            animated
          />
          <Spacer width={10} />
          <IconButton
            accessibilityStates={[]}
            icon={paused ? 'play-circle-outline' : 'pause-circle-outline'}
            onPress={actions.paused}
            style={{ width: 80, margin: 0 }}
            size={80}
            animated
          />
          <IconButton
            accessibilityStates={[]}
            icon="fast-forward-30"
            // @ts-ignore
            onPress={(): void => player.current?.seek(currentTime + 30)}
            size={30}
            animated
          />
          <IconButton
            accessibilityStates={[]}
            icon="skip-next"
            onPress={() => actions.loadSource(props.nextSourceIndex)}
            size={30}
          />
        </View>
        <Spacer width={10} />
        <FavorisButtonContainer source={source} />
        <Spacer width={10} />
      </View>
      <Spacer height={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get('window').height - 10
  },
  head: {
    alignItems: 'center',
    paddingHorizontal: 16,
    flex: 1
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 2
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 40
  },
  progressBar: { flex: 1, marginHorizontal: 20 },
  actionsContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Player;
