import React, { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import SnapCarousel from "react-native-snap-carousel";

import { PLAYLIST_PICTURE_PLACEHOLDER } from "../constants";
import { usePlaylist } from "../providers/Playlist";
import { Playlist } from "../types";
import { Capsule, CapsuleTotalSongs } from "./Capsule";
import { ButtonPlayPlaylist, PlaylistActions } from "./CapsulePlaylist";

export const formatCardItem = (
  item: any
): { title: string; picture: string } => ({
  title: item?.title,
  picture:
    item?.videos[0]?.videoThumbnails[0]?.url ?? PLAYLIST_PICTURE_PLACEHOLDER,
});

interface CarouselItemProps {
  item: Playlist;
}

const CarouselItem: React.FC<CarouselItemProps> = memo(({ item }) => {
  const videosCount = item.videos?.length ?? 0;

  return (
    <View style={styles.itemContainer}>
      <Capsule data={formatCardItem(item)}>
        <CapsuleTotalSongs totalSongs={videosCount} />
        <PlaylistActions>
          <ButtonPlayPlaylist playlist={item} />
        </PlaylistActions>
      </Capsule>
    </View>
  );
});

export const CarouselPlaylists: React.FC = memo(() => {
  const { state } = usePlaylist();

  const playlists = state.playlists.filter((p) => p.title !== "favoris");

  if (!playlists.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SnapCarousel
        data={playlists}
        firstItem={playlists.length - 1}
        layout="tinder"
        itemWidth={Dimensions.get("window").width - 32}
        sliderWidth={Dimensions.get("window").width - 32}
        renderItem={({ item }) => <CarouselItem item={item} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: -60,
  },
  itemContainer: {
    paddingTop: 20,
  },
});
