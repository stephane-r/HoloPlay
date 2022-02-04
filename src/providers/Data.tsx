import AsyncStorage from "@react-native-community/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children, data }) => {
  const [state, setState] = useState({
    results: [],
    popular: [],
    top: [],
    lastPlays: [],
    ...data,
  });

  const setData = useCallback(
    (value) => {
      setState((prevState) => ({ ...prevState, ...value }));
    },
    [setState]
  );

  const value = useMemo(() => ({ state, setData }), [state, setData]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }

  const data = useMemo(
    () => ({
      receiveData: ({ key, data: dataReceived }): void => {
        if (key === "popular" && !context.state.search) {
          return context.setData({ [key]: dataReceived, search: dataReceived });
        }

        return context.setData({ [key]: dataReceived });
      },
      lastPlays: async (video): void => {
        const { lastPlays } = context.state;
        const lastPlayVideo = lastPlays[0];
        const videoIsAlreadyLastPlay =
          (video?.videoId || video) ===
          (lastPlayVideo?.videoId || lastPlayVideo?.id);

        if (videoIsAlreadyLastPlay) {
          return;
        }

        const lastPlaysUpdated = [video, ...lastPlays.slice(0, 9)];
        await AsyncStorage.setItem(
          "lastPlays",
          JSON.stringify(lastPlaysUpdated)
        );

        context.setData({ lastPlays: lastPlaysUpdated });
      },
    }),
    [context]
  );

  return { state: context.state, data };
};
