import { useNavigation } from "@react-navigation/native";
import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

import { CarouselPlaylists } from "../../components/Carousel";
import { LastPlays } from "../../components/LastPlays";
import Layout from "../../components/Layout";
import Profil from "../../components/Profil";
import { SearchPopular } from "../../components/Search/Popular";
import Spacer from "../../components/Spacer";
import { usePlayer } from "../../providers/Player";
import { usePlaylist } from "../../providers/Playlist";

const DashboardScreen: React.FC = memo(() => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Layout>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.screens.dashboard,
          },
        ]}
      >
        <Spacer height={30} />
        <Profil />
        <Spacer height={30} />
        <CarouselPlaylists />
      </View>
      <HeaderMarge />
      {/* <DevLoginNavigate /> */}
      <LastPlays setPlaylistFrom="lastPlays" />
      <Spacer height={15} />
      <SearchPopular
        title={t("search.popular")}
        setPlaylistFrom="popular"
        apiUrl="popular"
      />
      <Spacer height={15} />
      <SearchPopular
        title={t("search.trending")}
        setPlaylistFrom="trending"
        apiUrl="trending"
      />
      <ScreenFooterMarge />
    </Layout>
  );
});

const ScreenFooterMarge = memo(() => {
  const { state } = usePlayer();

  if (!state.video) {
    return null;
  }

  return <Spacer height={50} />;
});

const HeaderMarge = memo(() => {
  const { state: playlistState } = usePlaylist();
  const spacer = useMemo(() => {
    const playlist = playlistState.playlists.filter(
      (p) => p.title !== "favoris"
    );
    return playlist.length ? 90 : 30;
  }, [playlistState.playlists]);

  return <Spacer height={spacer} />;
});

const DevLoginNavigate = memo(() => {
  const navigation = useNavigation();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <Button onPress={() => navigation.navigate("Auth")}>Go to login</Button>
  );
});

const styles = StyleSheet.create({
  header: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default DashboardScreen;
