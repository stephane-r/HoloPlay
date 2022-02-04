import React, { memo, useMemo } from "react";

import { Player } from "../../components/Player";
import { usePlayer } from "../../providers/Player";
import { usePlaylist } from "../../providers/Playlist";

export const PlayerContainer = memo((props) => {
  const { state: playlistState } = usePlaylist();
  const { state: playerState } = usePlayer();

  const playlistCount = useMemo(
    () => playlistState.playlist && playlistState.playlist.length,
    [playlistState.playlist]
  );
  const nextVideoIndex = useMemo(
    () => (playlistCount > 1 ? playerState.videoIndex + 1 : null),
    [playerState, playlistCount]
  );
  const isFirstVideo = useMemo(
    () => playerState.videoIndex === 0,
    [playerState]
  );
  const isLastVideo = useMemo(
    () => nextVideoIndex === playlistCount,
    [nextVideoIndex, playlistCount]
  );

  if (!playerState.video) {
    return null;
  }

  return (
    <Player
      {...props}
      background={playerState.background}
      isLastVideo={isLastVideo}
      isFirstVideo={isFirstVideo}
    />
  );
});
