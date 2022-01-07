import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Layout from '../../components/Layout';
import Spacer from '../../components/Spacer';
import { CarouselPlaylists } from '../../components/Carousel';
import { useTranslation } from 'react-i18next';
import { usePlaylist } from '../../providers/Playlist';
import { LastPlays } from '../../components/LastPlays';
import { SearchPopular } from '../../components/Search/Popular';
import Profil from '../../components/Profil';

const DashboardScreen: React.FC = memo(() => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { state } = usePlaylist();

  return (
    <Layout>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.screens.dashboard
          }
        ]}>
        <Spacer height={30} />
        <Profil />
        <Spacer height={30} />
        <CarouselPlaylists />
      </View>
      <Spacer height={!state.playlists.length ? 30 : 90} />
      <LastPlays setPlaylistFrom="lastPlays" />
      <Spacer height={15} />
      <SearchPopular
        title={t('search.popular')}
        setPlaylistFrom="popular"
        apiUrl="popular"
      />
      <Spacer height={15} />
      <SearchPopular
        title={t('search.trending')}
        setPlaylistFrom="trending"
        apiUrl="trending"
      />
    </Layout>
  );
});

const styles = StyleSheet.create({
  header: {
    marginHorizontal: -16,
    paddingHorizontal: 16
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default DashboardScreen;
