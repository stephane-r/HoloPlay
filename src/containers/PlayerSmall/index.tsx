import React, { memo, useCallback } from "react";

import { PlayerSmall } from "../../components/PlayerSmall";
import { usePlayerTest } from "../../providers/Player";
import { useVideo } from "../../providers/Video";

export const PlayerSmallContainer = memo((props) => {
  const { state } = useVideo();
  const test = usePlayerTest();

  const handlePause = useCallback(() => {
    test.player.pause();
  }, [test]);

  if (!state.video) {
    return null;
  }

  return (
    <PlayerSmall
      {...props}
      video={state.video}
      background={state.background}
      paused={!test.state.play}
      onPause={handlePause}
    />
  );
});
