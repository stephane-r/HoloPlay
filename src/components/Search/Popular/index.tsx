import React, { useState, memo, useEffect } from 'react';
import { useQuery } from 'react-query';
import DialogAddVideoToPlaylist from '../../Dialog/AddVideoToPlaylist';
import { actions } from '../../../store';
import Playlist from '../../Playlist/List';
import { SearchVideo, Video, Playlist as PlaylistType } from '../../../types';
import { Text, Title, Button, IconButton } from 'react-native-paper';
import Spacer from '../../Spacer';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import search from '../../../queries/search';
import PlaceholderCardHorizontalList from '../../Placeholder/CardCenter';
import SearchError from '../Error';
import { CardSearch } from '../../CardSearch';
import { ScrollView } from '../../Card/ScrollList';
import { Card } from '../../Card';

interface Props {
  playlists: PlaylistType[];
  setPlaylistFrom: string;
  apiUrl: string;
  title: string;
  instance: string;
}

const SearchPopularTop: React.FC<Props> = ({
  title,
  setPlaylistFrom,
  apiUrl,
  instance
}) => {
  const [enabled, setRefetch] = useState(true);
  const { isLoading, error, data } = useQuery(apiUrl, search, {
    enabled,
    onSuccess: () => setRefetch(false)
  });
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (data) {
      actions.receiveData({ key: setPlaylistFrom, data });
    }
  }, [data, instance]);

  const Header = () => (
    <View style={styles.header}>
      <Title style={{ fontSize: 27 }}>{title}</Title>
      <IconButton icon="sync" onPress={() => setRefetch(true)} />
    </View>
  );

  if (isLoading) {
    // TODO: rename to placeholder scrolllist
    return <PlaceholderCardHorizontalList />;
  }

  if (error || !Array.isArray(data) || data.length === 0) {
    return (
      <>
        <Header />
        <SearchError />
      </>
    );
  }

  return (
    <>
      <Header />
      <ScrollView>
        {data.map((video, index) => (
          <View style={{ width: 250, paddingTop: 16 }}>
            <Card
              key={video.videoId}
              loopIndex={index}
              data={video}
              setPlaylistFrom={setPlaylistFrom}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default memo(SearchPopularTop);
