import Slider from "@react-native-community/slider";
import ViewPager from "@react-native-community/viewpager";
import TimeFormat from "hh-mm-ss";
import React, { memo, useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import MusicControl from "react-native-music-control";
import { ActivityIndicator, IconButton, Text } from "react-native-paper";
import Video from "react-native-video";

import useDownloadFile from "../hooks/useDownloadFile";
import { useAppSettings } from "../providers/App";
import { useFavorite } from "../providers/Favorite";
import { usePlayer } from "../providers/Player";
import { useSnackbar } from "../providers/Snackbar";
import { useVideo } from "../providers/Video";
import hex2rgba from "../utils/hex2rgba";
import { Dot } from "./Dot";
import { ButtonFavorite } from "./Favoris/Button";
import { Spacer } from "./Spacer";
import { VideoList } from "./Video";

const color = "#ffffff";

export const Player: React.FC = ({
  background,
  isFirstVideo,
  isLastVideo,
  onClose,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <PlayerPager onClose={onClose} />
      <PlayerVideo isFirstVideo={isFirstVideo} isLastVideo={isLastVideo} />
      <Spacer height={30} />
    </View>
  );
};

const PlayerPager = memo(({ onClose }) => {
  const pager = useRef(null);
  const {
    state: { video, background, playlist },
    player,
  } = useVideo();

  const handleLoadVideo = useCallback(
    async (videoIndex: number) => {
      await player.loadVideo({
        videoIndex,
        setPlaylistFrom: playlist.videos,
      });
    },
    [player, playlist.videos]
  );

  return (
    <>
      <ViewPager
        style={styles.head}
        initialPage={0}
        scrollEnabled={false}
        orientation="horizontal"
        transitionStyle="scroll"
        ref={pager}
      >
        <View style={styles.head}>
          <PlayerVideoDetail
            video={video}
            background={background}
            onClose={onClose}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <ScrollView keyboardShouldPersistTaps="always">
            <VideoList
              videos={playlist}
              onPlay={handleLoadVideo}
              canRemoveVideo={false}
              color="white"
            />
          </ScrollView>
          <Spacer height={20} />
        </View>
      </ViewPager>
      <PlayerPagerDots pager={pager} />
    </>
  );
});

const PlayerPagerDots = memo(({ pager }) => {
  const [page, setPage] = useState(0);

  const handlePage = useCallback(
    (index) => {
      pager.current?.setPage(index);
      setPage(index);
    },
    [pager, setPage]
  );

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Dot isActive={page === 0} onPress={() => handlePage(0)} />
      <Dot isActive={page === 1} onPress={() => handlePage(1)} />
    </View>
  );
});

const PlayerVideoDetail = memo(({ video, background, onClose }) => {
  return (
    <>
      <View>
        <Image
          source={{ uri: video.thumbnail.url }}
          style={{
            width: Dimensions.get("window").width,
            height: video.thumbnail.height + 40,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: Dimensions.get("window").width,
          }}
        >
          <LinearGradient
            colors={["rgba(255, 255, 255, 0)", hex2rgba(background, 1)]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ height: 100 }}
          />
        </View>
        <View style={[styles.actionsAbsolute, { left: 15 }]}>
          <IconButton
            icon="chevron-down"
            color="white"
            style={{ margin: 0 }}
            onPress={() => setTimeout(() => onClose(), 200)}
            size={28}
            animated
          />
        </View>
      </View>
      <Spacer height={30} />
      <Text
        numberOfLines={2}
        style={{
          textAlign: "center",
          color,
          fontSize: 20,
        }}
      >
        {video.title}
      </Text>
      <Spacer height={10} />
      <Text style={{ color }}>{video.author}</Text>
    </>
  );
});

const PlayerVideo = memo(({ isFirstVideo, isLastVideo }) => {
  const { state, video } = useVideo();
  const { state: playerState, player } = usePlayer();
  const [loading, setLoading] = useState(false);

  MusicControl.enableControl("play", true);
  MusicControl.enableControl("pause", true);
  MusicControl.enableControl("stop", false);
  MusicControl.enableControl("nextTrack", true);
  MusicControl.enableControl("previousTrack", true);
  MusicControl.enableBackgroundMode(true);
  MusicControl.on("play", handlePlay);
  MusicControl.on("pause", handlePause);
  MusicControl.on("nextTrack", () => handlePlayNextVideo());
  MusicControl.on("previousTrack", (): void => handlePlayPreviousVideo());

  const handlePlayNextVideo = useCallback(() => {
    video.playNextVideo();
  }, [video]);

  const handlePlayPreviousVideo = useCallback(() => {
    video.playPreviousVideo();
  }, [video]);

  const handlePlay = useCallback(() => {
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING,
    });
    player.play();
  }, [player]);

  const handlePause = useCallback(() => {
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED,
      elapsedTime: playerState.currentTime ?? 0,
    });
    player.pause();
  }, [player]);

  const handleRepeat = useCallback(() => {
    player.repeat();
  }, [player]);

  const handleError = useCallback(() => {
    video.stop();
  }, [video]);

  return (
    <>
      <PlayerProgress
        {...state}
        paused={!playerState.play}
        repeat={playerState.repeat}
        loading={loading}
        setLoading={setLoading}
        setCurrentTime={player.setCurrentTime}
        currentTime={playerState.currentTime}
        play={handlePlay}
        onPlayNextVideo={handlePlayNextVideo}
        onPause={handlePause}
        onError={handleError}
      />
      <Spacer height={25} />
      <PlayerActions
        {...state}
        paused={!playerState.play}
        repeat={playerState.repeat}
        loading={loading}
        setLoading={setLoading}
        onPlayNextVideo={handlePlayNextVideo}
        onPlayPreviousVideo={handlePlayPreviousVideo}
        onPlay={handlePlay}
        onPause={handlePause}
        onRepeat={handleRepeat}
        isFirstVideo={isFirstVideo}
        isLastVideo={isLastVideo}
      />
    </>
  );
});

const PlayerProgress = memo(
  ({
    loading,
    setLoading,
    currentTime,
    setCurrentTime,
    video,
    repeat,
    play,
    paused,
    onPlayNextVideo,
    onPause,
    onError,
  }) => {
    const player = useRef(null);
    const snackbar = useSnackbar();
    const { settings } = useAppSettings();
    const { loading: downloadLoading, downloadVideo } = useDownloadFile();

    const autoPlay = useMemo(() => settings.autoPlay, [settings.autoPlay]);

    const onProgress = useCallback(
      (progress): void => {
        setLoading(false);
        setCurrentTime(Math.round(progress.currentTime));

        MusicControl.updatePlayback({
          state: MusicControl.STATE_PLAYING,
          elapsedTime: Math.round(progress.currentTime),
        });
      },
      [setLoading, setCurrentTime]
    );

    const onLoadStart = useCallback((): void => {
      const { title, author, lengthSeconds, thumbnail } = video;

      if (!loading) {
        setLoading(true);
      }

      MusicControl.setNowPlaying({
        title,
        artwork: thumbnail.url,
        artist: author,
        duration: lengthSeconds,
      });

      MusicControl.updatePlayback({
        state: MusicControl.STATE_BUFFERING,
      });
    }, [video, loading, setLoading]);

    const onEnd = useCallback((): void => {
      if (!autoPlay && !repeat) {
        return onPause();
      }

      if (!repeat) {
        setLoading(true);
        onPlayNextVideo();
      }
    }, [repeat, setLoading, onPlayNextVideo]);

    const onVideoError = useCallback(
      (error): void => {
        snackbar.show(
          error.error.errorException || error.error.localizedFailureReason
        );
        onError();
        setLoading(false);
      },
      [snackbar, setLoading]
    );

    useEffect(() => {
      if (video && paused) {
        play();
      }
    }, [video]);

    const duration = video.lengthSeconds;

    return (
      <>
        <Video
          ref={player}
          source={{
            uri: video.uri,
          }}
          audioOnly={true}
          playInBackground={true}
          paused={paused}
          repeat={repeat}
          onProgress={onProgress}
          onLoadStart={onLoadStart}
          onEnd={onEnd}
          onError={onVideoError}
          onAudioBecomingNoisy={() => onPause(currentTime)}
        />
        {!video.liveNow && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              height: 58,
            }}
          >
            <IconButton
              icon="rewind-30"
              onPress={() => player.current?.seek(currentTime - 30)}
              color="white"
              size={28}
              animated
            />
            {downloadLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <IconButton
                icon="download"
                color="white"
                size={30}
                onPress={() =>
                  downloadVideo({
                    url: video.uri,
                    fileName: video.title,
                  })
                }
              />
            )}
            <IconButton
              icon="fast-forward-30"
              onPress={(): void => player.current?.seek(currentTime + 30)}
              color="white"
              size={28}
              animated
            />
          </View>
        )}
        <View style={styles.progress}>
          <Text style={{ fontSize: 12, color }}>
            {currentTime
              ? TimeFormat.fromS(
                  currentTime,
                  duration > 3600 ? "hh:mm:ss" : "mm:ss"
                )
              : "00:00"}
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
          <Text style={{ fontSize: 12, color }}>
            {TimeFormat.fromS(video.lengthSeconds)}
          </Text>
        </View>
      </>
    );
  }
);

const PlayerActions = memo(
  ({
    loading,
    repeat,
    paused,
    onPlay,
    onPause,
    onRepeat,
    onPlayNextVideo,
    isFirstVideo,
    isLastVideo,
  }) => {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 4,
        }}
      >
        <IconButton
          icon={repeat ? "repeat-once" : "repeat"}
          size={25}
          color={color}
          onPress={onRepeat}
          animated
        />
        <IconButton
          icon="skip-previous"
          color={color}
          onPress={onPlayNextVideo}
          disabled={isFirstVideo}
          size={25}
          style={{
            backgroundColor: "rgba(255, 255, 255, .3)",
            marginLeft: "auto",
          }}
        />
        {loading ? (
          <View style={{ padding: 35 }}>
            <ActivityIndicator color="white" size={50} />
          </View>
        ) : (
          <IconButton
            icon={paused ? "arrow-right-drop-circle" : "pause-circle"}
            onPress={() => (paused ? onPlay() : onPause())}
            color={color}
            style={{
              width: 80,
              height: 80,
              margin: 0,
              marginHorizontal: 20,
            }}
            size={80}
            animated
          />
        )}
        <IconButton
          color={color}
          icon="skip-next"
          onPress={onPlayNextVideo}
          disabled={isLastVideo}
          size={25}
          style={{
            backgroundColor: "rgba(255, 255, 255, .3)",
            marginRight: "auto",
          }}
        />
        <PlayerFavorite />
      </View>
    );
  }
);

const PlayerFavorite = memo(() => {
  const {
    state: { video },
  } = useVideo();
  const {
    state: { favorisPlaylist, favorisIds },
  } = useFavorite();

  return (
    <ButtonFavorite
      favorisPlaylist={favorisPlaylist}
      favorisIds={favorisIds}
      video={video}
      color="white"
    />
  );
});

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
  },
  head: {
    alignItems: "center",
    paddingHorizontal: 16,
    flex: 1,
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  content: {
    alignItems: "center",
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  progressBar: { flex: 1 },
  actionsContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionsAbsolute: {
    position: "absolute",
    top: 15,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 50,
  },
});
