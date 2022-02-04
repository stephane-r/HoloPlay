import React, { memo } from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import SnapCarousel from "react-native-snap-carousel";

import { usePlayer } from "../../providers/Player";
import { usePlaylist } from "../../providers/Playlist";
import { Playlist } from "../../types";
import { Capsule, CapsuleTotalSongs } from "../Capsule";
import { ButtonPlayPlaylist, PlaylistActions } from "../CapsulePlaylist";
import { IconButtonPlay } from "../IconButtonPlay";

interface CarouselItemProps {
  item: Playlist;
  index: number;
}

export const setCardItem = (item: any): any => ({
  title: item?.title,
  picture:
    item?.videos[0]?.videoThumbnails[0]?.url ??
    "https://greeneyedmedia.com/wp-content/plugins/woocommerce/assets/images/placeholder.png",
});

const CarouselItem: React.FC<CarouselItemProps> = memo(({ item }) => {
  const videosCount = item.videos?.length ?? 0;

  return (
    <View style={styles.itemContainer}>
      <Capsule data={setCardItem(item)}>
        <CapsuleTotalSongs totalSongs={videosCount} />
        <PlaylistActions>
          <ButtonPlayPlaylist playlist={item} />
        </PlaylistActions>
      </Capsule>
    </View>
  );
});

export const CarouselPlaylists: React.FC = memo(() => {
  const { t } = useTranslation();
  const { state } = usePlaylist();

  const playlists = state.playlists.filter((p) => p.title !== "favoris");

  if (!playlists.length) {
    return null;
  }

  return (
    <View style={{ marginBottom: -60 }}>
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
  itemContainer: {
    paddingTop: 20,
  },
});
