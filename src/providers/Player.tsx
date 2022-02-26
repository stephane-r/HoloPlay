import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Dimensions } from "react-native";

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [state, setState] = useState({
    play: true,
    repeat: false,
    currentTime: null,
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

  if (!context) {
    throw new Error("useVideo must be used within a PlayerProvider");
  }

  const player = useMemo(
    () => ({
      play: (): void => {
        context.setPlayer({ play: true });
      },
      pause: (): void => {
        context.setPlayer({ play: !context.state.play });
      },
      repeat: (): void => {
        context.setPlayer({ repeat: !context.state.repeat });
      },
      setCurrentTime: (value): void => {
        context.setPlayer({ currentTime: value });
      },
    }),
    [context]
  );

  return { state: context.state, player };
};
