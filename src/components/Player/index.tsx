import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';
import {
  Text,
  Headline,
  IconButton,
  ActivityIndicator,
  Button
} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import MusicControl from 'react-native-music-control';
import TimeFormat from 'hh-mm-ss';
import LinearGradient from 'react-native-linear-gradient';
import { getColorFromURL } from 'rn-dominant-color';
import ViewPager from '@react-native-community/viewpager';
import { actions } from '../../store';
import Spacer from '../Spacer';
import ISO8601toDuration from '../../utils/ISO8601toDuration';
import FavorisButtonContainer from '../../containers/Favoris/Button';
import { Video as VideoType } from '../../types';
import useDownloadFile from '../../hooks/useDownloadFile';
import hex2rgba from '../../utils/hex2rgba';
import PlaylistContainer from '../../containers/Playlist';
import { ScrollView } from 'react-native-gesture-handler';
import Dot from '../Dot';

interface Props {
  video: VideoType;
  paused: boolean;
  repeat: boolean;
  previousVideoIndex: () => void;
  nextVideoIndex: () => void;
}

const Player: React.FC<Props> = ({ video, paused, repeat, ...props }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [color, setColor] = useState('#FFFFFF');
  const [background, setBackground] = useState('#FFFFFF');
  const [page, setPage] = useState<boolean>(0);
  const player = useRef(null);
  const pager = useRef(null);
  const { loading, downloadVideo } = useDownloadFile();

  getColorFromURL(video?.thumbnail.url).then((colors) =>
    setBackground(colors.primary)
  );

  useEffect(() => {
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', false);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableControl('changePlaybackPosition', true);
    MusicControl.enableControl('seek', true);
    MusicControl.enableControl('skipBackward', true, { interval: 15 });
    MusicControl.enableControl('skipForward', true, { interval: 30 });
    MusicControl.enableBackgroundMode(true);
    MusicControl.on('play', () => {
      actions.paused();
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING
      });
    });
    MusicControl.on('pause', () => {
      actions.paused();
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED
      });
    });
    MusicControl.on(
      'nextTrack',
      () => props.nextVideoIndex && actions.loadVideo(props.nextVideoIndex)
    );
    MusicControl.on(
      'previousTrack',
      (): void =>
        props.previousVideoIndex && actions.loadVideo(props.previousVideoIndex)
    );
    MusicControl.on('skipBackward', (): void =>
      player.current?.seek(duration - 30)
    );
    MusicControl.on('skipForward', (): void =>
      player.current?.seek(duration + 30)
    );
  }, [video]);

  const onProgress = ({ currentTime }: { currentTime: number }): void => {
    setLoading(false);
    setCurrentTime(Math.round(currentTime));

    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING
    });
  };

  const onLoadStart = (): void => {
    const { title, author, lengthSeconds, thumbnail } = video;

    if (!isLoading) {
      setLoading(true);
    }

    MusicControl.setNowPlaying({
      title,
      artwork: thumbnail.url,
      artist: author,
      duration: lengthSeconds
    });

    MusicControl.updatePlayback({
      state: MusicControl.STATE_BUFFERING
    });
  };

  const onEnd = (): void => {
    if (props.nextVideoIndex) {
      actions.loadVideo(props.nextVideoIndex);
    }
  };

  const onError = (): void => {
    setLoading(false);
    actions.setFlashMessage('Error from Stream API');
  };

  if (!video) {
    return null;
  }

  const duration = video.lengthSeconds;
  const percentage = Math.floor((100 / duration) * currentTime);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Video
        ref={player}
        source={{
          uri: video.uri
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
      <ViewPager
        style={styles.head}
        initialPage={0}
        scrollEnabled={false}
        orientation="horizontal"
        transitionStyle="scroll"
        ref={pager}>
        <View key="1" style={styles.head}>
          <View>
            {isLoading && (
              <ActivityIndicator
                accessibilityStates={[]}
                style={styles.loader}
                color={color}
              />
            )}
            <Image
              source={{ uri: video.thumbnail.url }}
              style={{
                width: video.thumbnail.width + 100,
                height: video.thumbnail.height + 40
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: video.thumbnail.width + 100
              }}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0)', hex2rgba(background, 1)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  height: 100
                }}
              />
            </View>
          </View>
          <Spacer height={30} />
          <Text
            numberOfLines={2}
            style={{
              textAlign: 'center',
              color,
              fontSize: 20
            }}>
            {video.title}
          </Text>
          <Spacer height={10} />
          <Text accessibilityStates={[]} style={{ color }}>
            {video.author}
          </Text>
        </View>
        <View key="2" style={{ paddingHorizontal: 20 }}>
          <ScrollView keyboardShouldPersistTaps>
            <PlaylistContainer color={color} />
          </ScrollView>
          <Spacer height={20} />
        </View>
      </ViewPager>
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Dot
            isActive={page === 0}
            color={color}
            onPress={() => {
              pager.current?.setPage(0);
              setPage(0);
            }}
          />
          <Dot
            isActive={page === 1}
            color={color}
            onPress={() => {
              pager.current?.setPage(1);
              setPage(1);
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', height: 57 }}>
          <IconButton
            accessibilityStates={[]}
            icon="rewind-30"
            onPress={() => player.current?.seek(currentTime - 30)}
            color="white"
            size={28}
            animated
          />
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <IconButton
              accessibilityStates={[]}
              icon="download"
              color="white"
              size={30}
              loading={loading}
              onPress={() =>
                downloadVideo({
                  url: video.uri,
                  fileName: video.title
                })
              }
            />
          )}
          <IconButton
            accessibilityStates={[]}
            icon="fast-forward-30"
            onPress={(): void => player.current?.seek(currentTime + 30)}
            color="white"
            size={28}
            animated
          />
        </View>
        <View style={styles.progress}>
          <Text accessibilityStates={[]} style={{ fontSize: 12, color }}>
            {currentTime
              ? TimeFormat.fromS(
                  currentTime,
                  duration > 3600 ? 'hh:mm:ss' : 'mm:ss'
                )
              : '00:00'}
          </Text>
          <View style={styles.progressBar}>
            <Slider
              value={currentTime}
              maximumValue={video.lengthSeconds}
              onValueChange={(value) => player.current?.seek(Math.floor(value))}
              minimumTrackTintColor={color}
              thumbTintColor={color}
              thumbStyle={{ width: 15, height: 15 }}
              thumbTouchSize={{ width: 40, height: 40 }}
              animationType="spring"
              trackStyle={{ height: 2 }}
              maximumTrackTintColor="rgba(255, 255, 255, .3)"
              animateTransitions
            />
          </View>
          <Text accessibilityStates={[]} style={{ fontSize: 12, color }}>
            {TimeFormat.fromS(video.lengthSeconds)}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 4 // 16 + 4
          }}>
          <IconButton
            accessibilityStates={[]}
            icon={repeat ? 'repeat-once' : 'repeat'}
            size={25}
            color={color}
            onPress={actions.repeat}
            animated
          />
          <IconButton
            accessibilityStates={[]}
            icon="skip-previous"
            color={color}
            onPress={() => actions.loadVideo(props.previousVideoIndex)}
            size={25}
            style={{
              backgroundColor: 'rgba(255, 255, 255, .3)',
              marginLeft: 'auto'
            }}
          />
          <IconButton
            accessibilityStates={[]}
            icon={paused ? 'arrow-right-drop-circle' : 'pause-circle'}
            onPress={() => {
              MusicControl.updatePlayback({
                state: MusicControl.STATE_STOPPED
              });
              actions.paused();
            }}
            color={color}
            style={{ width: 80, margin: 0, marginHorizontal: 20 }}
            size={80}
            animated
          />
          <IconButton
            accessibilityStates={[]}
            color={color}
            icon="skip-next"
            onPress={() => actions.loadVideo(props.nextVideoIndex)}
            size={25}
            style={{
              backgroundColor: 'rgba(255, 255, 255, .3)',
              marginRight: 'auto'
            }}
          />
          <FavorisButtonContainer video={video} color={color} />
        </View>
      </View>
      <Spacer height={10} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height
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
    zIndex: 2
  },
  content: {
    alignItems: 'center'
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15
  },
  progressBar: { flex: 1 },
  actionsContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Player;
