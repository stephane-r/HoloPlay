import AsyncStorage from "@react-native-community/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { ApiRoutes } from "../constants";
import { Playlist, Video } from "../types";
import callApi from "../utils/callApi";
import { useAppSettings } from "./App";
import { useSnackbar } from "./Snackbar";

const PlaylistContext = createContext(null);

export const PlaylistProvider = ({ children, data }) => {
  const [state, setState] = useState({
    playlists: [],
    playlist: null,
    ...data,
  });
  const { settings } = useAppSettings();
  const token = settings.token;

  useEffect(() => {
    if (token) {
      fetchPlaylists().then((playlists) => {
        setPlaylist({
          playlists,
        });
      });
    }
  }, [token]);

  const setPlaylist = useCallback(
    (value) => {
      setState((prevState) => ({ ...prevState, ...value }));
    },
    [setState]
  );

  const value = useMemo(() => ({ state, setPlaylist }), [state, setPlaylist]);

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};

// TODO: l'instance api d'invidious avance bien
// installer invidious en local avec Docker pour faire les tests
// Garder en tête l'idée des multitoken par instances (a voir comment implémenté ?)

export const usePlaylist = () => {
  const { t } = useTranslation();
  const context = useContext(PlaylistContext);
  const { settings } = useAppSettings();
  const snackbar = useSnackbar();

  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }

  const playlist = useMemo(
    () => ({
      set: (playlists: Playlist[]): void => {
        context.setPlaylist({ playlists });
      },
      create: async (title: string, id: null | string): void => {
        try {
          const playlists = await createPlaylists({
            title,
            id,
            initialPlaylists: context.state.playlists,
            logoutMode: settings.logoutMode,
          });

          context.setPlaylist({ playlists });
        } catch (error) {
          snackbar.show(error.message);
        }
      },
      update: async (playlist: Playlist): void => {
        try {
          if (settings.token) {
            await callApi({
              url: `auth/${ApiRoutes.PlaylistId(playlist.playlistId)}`,
              method: "PATCH",
              body: {
                title: playlist.title,
                privacy: "public",
              },
            });
            const playlists = await fetchPlaylists();
            context.setPlaylist({ playlists });
            return;
          }
          const playlists = context.state.playlists.map((p) => {
            if (p.playlistId === playlist.playlistId) {
              return {
                ...p,
                title: playlist.title,
              };
            }

            return p;
          });

          AsyncStorage.setItem("playlists", JSON.stringify(playlists));

          context.setPlaylist({ playlists });
        } catch (error) {
          snackbar.show(error.message);
        }
      },
      remove: async (playlistId: string): void => {
        try {
          const playlists = await removePlaylist({
            logoutMode: settings.logoutMode,
            playlistId,
          });

          context.setPlaylist({ playlists });
        } catch (error) {
          snackbar.show(error.message);
        }
      },
      addVideo: async ({
        playlistId,
        playlistTitle,
        video,
        isNew,
      }: {
        playlistId: string;
        playlistTitle: string;
        video: Video;
        isNew: boolean;
      }): void => {
        try {
          if (settings.token) {
            await callApi({
              url: ApiRoutes.Videos(playlistId),
              method: "POST",
              body: {
                videoId: video.videoId,
              },
            });
            const playlists = await fetchPlaylists();
            snackbar.show(t("snackbar.addVideoToPlaylistSuccess"));
            context.setPlaylist({ playlists });
            return;
          }

          const videoOverrided: Video = {
            ...video,
            indexId: uuidv4(),
          };

          let initialPlaylists = context.state.playlists;

          if (isNew) {
            initialPlaylists = await createPlaylists({
              title: playlistTitle,
              id: playlistId,
              initialPlaylists: context.state.playlists,
              logoutMode: settings.logoutMode,
            });
          }

          const playlists = initialPlaylists.map((p) => {
            if (p.playlistId === playlistId) {
              return {
                ...p,
                videos: [videoOverrided, ...p.videos],
              };
            }

            return p;
          });

          AsyncStorage.setItem("playlists", JSON.stringify(playlists));

          snackbar.show(t("snackbar.addVideoToPlaylistSuccess"));
          context.setPlaylist({ playlists });
        } catch (error) {
          snackbar.show(error.message);
        }
      },
      removeVideo: async ({
        playlistId,
        videoIndexId,
      }: {
        playlistId: string;
        videoIndexId: string;
      }): void => {
        try {
          if (settings.token) {
            await callApi({
              url: `auth/${ApiRoutes.VideoIndexId(playlistId, videoIndexId)}`,
              method: "DELETE",
            });
            const playlists = await fetchPlaylists();
            snackbar.show(t("snackbar.removeVideoFromPlaylistSuccess"));
            context.setPlaylist({ playlists });
            return;
          }

          const playlists = context.state.playlists.map((p) => {
            if (p.playlistId === playlistId) {
              return {
                ...p,
                videos: p.videos.filter((v) => v.indexId !== videoIndexId),
              };
            }

            return p;
          });

          AsyncStorage.setItem("playlists", JSON.stringify(playlists));

          snackbar.show(t("snackbar.removeVideoFromPlaylistSuccess"));
          context.setPlaylist({ playlists });
        } catch (error) {
          snackbar.show(error.message);
        }
      },
      sortPlaylist: async (playlist: Playlist) => {
        const playlists = context.state.playlists.map((p) =>
          p.playlistId === playlist.playlistId ? playlist : p
        );

        if (settings.logoutMode) {
          await AsyncStorage.setItem("playlists", JSON.stringify(playlists));
        }

        context.setPlaylist({ playlists });
      },
      fetchPlaylists: async () => {
        const playlists: Playlist[] = await fetchPlaylists();
        await AsyncStorage.setItem("playlists", JSON.stringify([]));
        context.setPlaylist({
          playlists,
        });
      },
    }),
    [context, settings.logoutMode, snackbar, t]
  );

  return { state: context.state, playlist };
};

const createPlaylists = async ({
  title,
  id,
  initialPlaylists,
  logoutMode,
}: {
  title: string;
  id: null | string;
  initialPlaylists: Playlist[];
  logoutMode: boolean;
}): void => {
  if (!logoutMode) {
    await callApi({
      url: ApiRoutes.Playlists,
      method: "POST",
      body: {
        title,
        privacy: "public",
      },
    });

    return fetchPlaylists();
  }

  const playlist = {
    playlistId: id ?? uuidv4(),
    title,
    privacy: "public",
    videos: [],
  };
  const playlists = [playlist, ...initialPlaylists];

  if (logoutMode) {
    await AsyncStorage.setItem("playlists", JSON.stringify(playlists));
  }

  return playlists;
};

const removePlaylist = async ({ logoutMode, playlistId }) => {
  if (!logoutMode) {
    const test = await callApi({
      url: `${ApiRoutes.Playlists}/${playlistId}`,
      method: "DELETE",
    });
    console.log(test);

    return fetchPlaylists();
  }

  const playlistsUpdated = playlists.filter((p) => p.playlistId !== playlistId);

  await AsyncStorage.setItem("playlists", JSON.stringify(playlistsUpdated));

  return playlistsUpdated;
};

const fetchPlaylists = async () => {
  const playlists: Playlist[] = await callApi({
    url: ApiRoutes.Playlists,
  });

  if (playlists.error) {
    throw new Error(playlists.error);
  }

  return playlists;
};
