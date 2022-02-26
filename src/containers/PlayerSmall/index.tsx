import React, { memo, useCallback } from "react";

import { PlayerSmall } from "../../components/PlayerSmall";
import { usePlayer } from "../../providers/Player";
import { useVideo } from "../../providers/Video";

export const PlayerSmallContainer = memo((props) => {
  const { state: videoState } = useVideo();
  const { player, state: playerState } = usePlayer();

  const handlePause = useCallback(() => {
    player.pause();
  }, [player]);

  if (!videoState.video) {
    return null;
  }

  return (
    <PlayerSmall
      {...props}
      video={videoState.video}
      background={videoState.background}
      paused={!playerState.play}
      onPause={handlePause}
    />
  );
});
