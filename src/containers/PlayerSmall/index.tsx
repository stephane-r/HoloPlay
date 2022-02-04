import React, { memo, useCallback } from "react";

import { PlayerSmall } from "../../components/PlayerSmall";
import { usePlayer } from "../../providers/Player";

export const PlayerSmallContainer = memo((props) => {
  const { state, player } = usePlayer();

  const handlePause = useCallback(() => {
    player.pause();
  }, [player]);

  if (!state.video) {
    return null;
  }

  return (
    <PlayerSmall
      {...props}
      video={state.video}
      background={state.background}
      paused={state.paused}
      onPause={handlePause}
    />
  );
});
