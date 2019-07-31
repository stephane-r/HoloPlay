/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import {
  Text,
  Headline,
  IconButton,
  ProgressBar,
  ActivityIndicator
} from 'react-native-paper';
import Video from 'react-native-video';
import config from 'react-native-config';
import MusicControl from 'react-native-music-control';
import { withApollo } from 'react-apollo';
import TimeFormat from 'hh-mm-ss';
import { actions } from '../../store';
import Spacer from '../Spacer';
import ISO8601toDuration from '../../utils/ISO8601toDuration';
import youtubeDurationToSeconds from '../../utils/youtubeDurationToSeconds';
import GET_USER from '../../graphql/query/user';
import { ADD_TO_FAVORIS } from '../../graphql/mutation/favoris';

// @flow
const { YOUTUBE_API_STREAM_URL } = config;

type PlayerProps = {
  client: Object,
  userId: number,
  source: Object,
  paused: boolean,
  repeat: boolean,
  previousSourceIndex: Function,
  nextSourceIndex: Function
};

const Player = ({
  client,
  userId,
  source,
  paused,
  repeat,
  ...props
}: PlayerProps) => {
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

  const isFavoris = props.favorisIds.includes(source.id);

  const AddOrRemoveToFavoris = () => {
    const refetchQueries = [
      {
        query: GET_USER,
        variables: { userId }
      }
    ];

    const favorisIds = props.favorisIds ? props.favorisIds : [];
    const favoris = props.favoris ? props.favoris : [];

    if (isFavoris) {
      return client.mutate({
        mutation: ADD_TO_FAVORIS,
        variables: {
          userId,
          favorisIds: favorisIds ? favorisIds.filter(f => f !== source.id) : [],
          favoris: favoris ? favoris.filter(f => f.id !== source.id) : []
        },
        refetchQueries
      });
    }

    return client.mutate({
      mutation: ADD_TO_FAVORIS,
      variables: {
        userId,
        favorisIds: [...favorisIds, source.id],
        favoris: favoris ? [...favoris, source] : [source]
      },
      refetchQueries
    });
  };

  const uri = `${YOUTUBE_API_STREAM_URL}/${source.id}`;
  const duration = youtubeDurationToSeconds(source.duration);
  const percentage = Math.floor((100 / duration) * currentTime);

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
      <Spacer height={10} />
      <IconButton
        icon="keyboard-arrow-left"
        size={30}
        onPress={actions.hidePlayer}
      />
      <Spacer height={40} />
      <View style={styles.head}>
        <View>
          {isLoading && <ActivityIndicator style={styles.loader} />}
          <Image
            source={{ uri: source.thumbnails.medium.url }}
            style={{
              width: source.thumbnails.medium.width,
              height: source.thumbnails.medium.height
            }}
          />
        </View>
        <Spacer height={30} />
        <Headline numberOfLines={1}>{source.title}</Headline>
        <Spacer height={10} />
        <Text>{source.channelTitle}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.progress}>
          <Text>
            {currentTime
              ? TimeFormat.fromS(
                currentTime,
                duration > 3600 ? 'hh:mm:ss' : 'mm:ss'
              )
              : '00:00'}
          </Text>
          <View style={styles.progressBar}>
            <ProgressBar
              progress={percentage / 100}
              color="#2575f4" />
          </View>
          <Text>{ISO8601toDuration(source.duration)}</Text>
          <Spacer height={30} />
        </View>
        <Spacer width={10} />
        <IconButton
          icon={repeat ? 'repeat-one' : 'repeat'}
          size={25}
          onPress={actions.repeat}
          animated
        />
        <View style={styles.actionsContainer}>
          <IconButton
            icon="skip-previous"
            onPress={() => actions.loadSource(props.previousSourceIndex)}
            size={30}
          />
          <Spacer width={10} />
          <IconButton
            icon={paused ? 'play-circle-outline' : 'pause-circle-outline'}
            onPress={actions.paused}
            style={{ width: 80, margin: 0 }}
            size={80}
            animated
          />
          <IconButton
            icon="skip-next"
            onPress={() => actions.loadSource(props.nextSourceIndex)}
            size={30}
          />
        </View>
        <Spacer width={10} />
        <IconButton
          icon={isFavoris ? 'favorite' : 'favorite-border'}
          color={isFavoris ? '#EE05F2' : '#607D8B'}
          size={25}
          onPress={AddOrRemoveToFavoris}
          animated
        />
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

export default withApollo(Player);
