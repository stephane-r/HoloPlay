import { ApiRoutes } from "../constants";
import { Video } from "../types";
import callApi from "../utils/callApi";
import { useData } from "./Data";
import { useFavorite } from "./Favorite";
import { useSnackbar } from "./Snackbar";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import config from "react-native-config";
import MusicControl from "react-native-music-control";
import { getColorFromURL } from "rn-dominant-color";

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [state, setState] = useState({
    backgroundColor: null,
    playerIsOpened: false,
    video: null,
    videoIndex: null,
    duration: 0,
    playlist: null,
  });

  const setPlayer = useCallback(
    (value) => {
      setState((prevState) => ({ ...prevState, ...value }));
    },
    [setState]
  );

  const value = useMemo(() => ({ state, setPlayer }), [state, setPlayer]);

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  const snackbar = useSnackbar();
  const { state: favoriteState } = useFavorite();
  const { state: dataState, data: dataActions } = useData();

  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }

  const getPlaylist = useCallback(
    (playlistFrom) => {
      if (!playlistFrom) {
        return context.state.playlist;
      }

      if (typeof playlistFrom === "object") {
        return playlistFrom;
      }

      if (playlistFrom.videoId) {
        return playlistFrom.videos;
      }

      switch (playlistFrom) {
        case "favoris":
          return favoriteState.favorisPlaylist.videos;
        default:
          return dataState[playlistFrom];
      }
    },
    [dataState, favoriteState, context.state.playlist]
  );

  const player = useMemo(
    () => ({
      show: (): void => {
        context.setPlayer({ playerIsOpened: true });
      },
      hide: (): void => {
        context.setPlayer({ playerIsOpened: false });
      },
      loadVideo: async ({ videoIndex, setPlaylistFrom }) => {
        try {
          const playlist = getPlaylist(setPlaylistFrom);
          const isLastVideo = playlist.length === videoIndex;
          // If is last video, we restart the playlist from first index
          const video: Video = isLastVideo ? playlist[0] : playlist[videoIndex];
          const data = await callApi({ url: ApiRoutes.VideoId(video.videoId) });

          const videoUpdated = {
            ...video,
            ...data,
            uri: data.liveNow
              ? `${config.YOUTUBE_AUDIO_SERVER_API_URL}/${data.videoId}`
              : data.adaptiveFormats.find(
                  ({ type }: any) => type === 'audio/webm; codecs="opus"'
                ).url,
            thumbnail: data.videoThumbnails.find(
              ({ quality }) => quality === "medium"
            ),
          };

          const [, colors] = await Promise.all([
            dataActions.lastPlays(video),
            getColorFromURL(videoUpdated?.thumbnail.url),
          ]);

          context.setPlayer({
            background: colors.primary,
            video: videoUpdated,
            videoIndex: videoIndex,
            playlist,
            playerIsOpened: true,
          });
        } catch (error) {
          snackbar.show(error.message);
        }
      },
      stop: () => {
        context.setPlayer({
          video: null,
          playerIsOpened: false,
        });
      },
      playNextVideo: (): void => {
        const nextVideoIndex =
          context.state.playlist && context.state.playlist.length > 1
            ? context.state.videoIndex + 1
            : null;

        if (nextVideoIndex !== null) {
          player.loadVideo({ videoIndex: nextVideoIndex });
        }
      },
      playPreviousVideo: (): void => {
        const previousVideoIndex =
          context.state.playlist && context.state.playlist.length > 1
            ? context.state.videoIndex + 1
            : null;

        if (previousVideoIndex !== null) {
          player.loadeVideo({ videoIndex: previousVideoIndex });
        }
      },
    }),
    [context, dataActions, snackbar, getPlaylist]
  );

  return { state: context.state, player };
};
