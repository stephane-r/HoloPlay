import React, { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { useVideo } from "../providers/Video";
import { Card, CardPlaceholder } from "./Card";
import { HorizontalScrollView } from "./HorizontalScrollView";

export const CardList: React.FC = memo(
  ({ display = "horizontal", ...props }) => {
    switch (display) {
      case "horizontal":
        return <HorizontalList {...props} />;
      case "grid":
        return <GridList {...props} />;
      default:
        return null;
    }
  }
);

const GridList = memo(({ data, setPlaylistFrom }) => {
  const { video } = useVideo();

  const handlePress = useCallback((props) => video.loadVideo(props), [video]);

  return (
    <View style={styles.list}>
      {data.map((item, index) => (
        <View
          key={`${item.videoId}-${index}-${setPlaylistFrom}`}
          style={{ width: "50%" }}
        >
          <Card
            data={item}
            onPress={() => handlePress({ videoIndex: index, setPlaylistFrom })}
          />
        </View>
      ))}
    </View>
  );
});

export const GridListPlaceholder = memo(() => {
  return (
    <View style={styles.list}>
      <View style={{ width: "50%" }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: "50%" }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: "50%" }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: "50%" }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: "50%" }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: "50%" }}>
        <CardPlaceholder />
      </View>
    </View>
  );
});

const HorizontalList = memo(({ data, setPlaylistFrom }) => {
  const { video } = useVideo();

  const handlePress = useCallback((props) => video.loadVideo(props), [video]);

  return (
    <HorizontalScrollView>
      {data.map((item, index) => (
        <View
          key={`${item.videoId}-${index}-${setPlaylistFrom}`}
          style={styles.cardContainer}
        >
          <Card
            data={item}
            onPress={() => handlePress({ videoIndex: index, setPlaylistFrom })}
          />
        </View>
      ))}
    </HorizontalScrollView>
  );
});

export const HorizontalListPlaceholder = memo(() => {
  return (
    <HorizontalScrollView>
      <View style={{ width: 250, paddingTop: 16 }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: 250, paddingTop: 16 }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: 250, paddingTop: 16 }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: 250, paddingTop: 16 }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: 250, paddingTop: 16 }}>
        <CardPlaceholder />
      </View>
    </HorizontalScrollView>
  );
});

export const styles = StyleSheet.create({
  cardContainer: {
    width: 250,
    paddingTop: 16,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 23,
    marginHorizontal: -8,
  },
});
