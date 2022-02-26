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

const TestContext = createContext(null);

export const PlayerProviderTest = ({ children }) => {
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

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export const usePlayerTest = () => {
  const context = useContext(TestContext);

  if (!context) {
    throw new Error("useVideo must be used within a PlayerProviderTest");
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
