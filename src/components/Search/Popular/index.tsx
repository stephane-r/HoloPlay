import React, { useState, useCallback, memo } from 'react';
import { useQuery } from 'react-query';
import { Playlist as PlaylistType } from '../../../types';
import { Title, IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import search from '../../../queries/search';
import SearchError from '../Error';
import { useAppSettings } from '../../../providers/App';
import { CardList, HorizontalListPlaceholder } from '../../CardList';
import { useData } from '../../../providers/Data';

interface Props {
  playlists: PlaylistType[];
  setPlaylistFrom: string;
  apiUrl: string;
  title: string;
  instance: string;
}

export const SearchPopular: React.FC<Props> = memo(
  ({ title, setPlaylistFrom, apiUrl }) => {
    const { settings } = useAppSettings();
    const { data: dataActions } = useData();
    const [refetch, setRefetch] = useState(true);
    const {
      isLoading: loading,
      error: requestError,
      data
    } = useQuery(apiUrl, () => search(apiUrl, settings.instance), {
      enabled: refetch,
      onSuccess: dataReceive => {
        setRefetch(false);
        dataActions.receiveData({
          key: setPlaylistFrom,
          data: dataReceive
        });
      }
    });

    const handlePress = useCallback(() => {
      setRefetch(true);
    }, [setRefetch]);

    if (refetch || loading) {
      return <HorizontalListPlaceholder />;
    }

    const error = requestError || !Array.isArray(data) || data.length === 0;

    return (
      <>
        <Header title={title} onPress={handlePress} />
        {error ? (
          <SearchError />
        ) : (
          <CardList data={data} setPlaylistFrom={setPlaylistFrom} />
        )}
      </>
    );
  }
);

const Header = memo(({ title, onPress }) => (
  <View style={styles.header}>
    <Title style={{ fontSize: 27 }}>{title}</Title>
    <IconButton icon="sync" onPress={() => (onPress ? onPress : null)} />
  </View>
));

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardContainer: {
    width: 250,
    paddingTop: 16
  }
});
