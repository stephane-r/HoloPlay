import React, { memo, useMemo } from "react";

import { Player } from "../../components/Player";
import { usePlaylist } from "../../providers/Playlist";
import { useVideo } from "../../providers/Video";

export const PlayerContainer = memo((props) => {
  const { state: playlistState } = usePlaylist();
  const { state: videoState } = useVideo();

  const playlistCount = useMemo(
    () => playlistState.playlist && playlistState.playlist.length,
    [playlistState.playlist]
  );
  const nextVideoIndex = useMemo(
    () => (playlistCount > 1 ? videoState.videoIndex + 1 : null),
    [videoState, playlistCount]
  );
  const isFirstVideo = useMemo(() => videoState.videoIndex === 0, [videoState]);
  const isLastVideo = useMemo(
    () => nextVideoIndex === playlistCount,
    [nextVideoIndex, playlistCount]
  );

  if (!videoState.video) {
    return null;
  }

  return (
    <Player
      {...props}
      background={videoState.background}
      isLastVideo={isLastVideo}
      isFirstVideo={isFirstVideo}
    />
  );
});
