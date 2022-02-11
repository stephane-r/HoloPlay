import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { usePlaylist } from "../providers/Playlist";
import { Playlist as PlaylistType } from "../types";
import { CapsulePlaylist } from "./CapsulePlaylist";
import DataEmpty from "./Data/Empty";

export const PlaylistList: React.FC = memo(() => {
  const { t } = useTranslation();
  const { state } = usePlaylist();

  const playlists: PlaylistType[] = useMemo(
    () => state.playlists.filter((p: PlaylistType) => p.title !== "favoris"),
    [state.playlists]
  );

  if (playlists?.length === 0) {
    return <DataEmpty text={t("data.empty.playlist")} />;
  }

  return (
    <View>
      {playlists.map((playlist) => (
        <CapsulePlaylist
          key={`playlist-item-${playlist.playlistId}`}
          playlist={playlist}
          totalSongs={playlist.videos?.length ?? 0}
        />
      ))}
    </View>
  );
});