import React, { useState, memo, useEffect } from 'react';
import { useQuery } from 'react-query';
import { actions } from '../../../store';
import { SearchVideo, Video, Playlist as PlaylistType } from '../../../types';
import { Text, Title, Button, IconButton } from 'react-native-paper';
import Spacer from '../../Spacer';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import search from '../../../queries/search';
import SearchError from '../Error';
import { ScrollView } from '../../Card/ScrollList';
import { Card } from '../../Card';
import { useAppSettings } from '../../../providers/App';
import { useCallback } from 'react';
import { CardList, HorizontalListPlaceholder } from '../../CardList';

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
    const [refetch, setRefetch] = useState(true);
    const {
      isLoading: loading,
      error: requestError,
      data
    } = useQuery(apiUrl, () => search(apiUrl, settings.instance), {
      enabled: refetch,
      onSuccess: () => setRefetch(false)
    });
    const { t } = useTranslation();
    const { navigate } = useNavigation();

    const handlePress = useCallback(() => {
      setRefetch(true);
    }, [setRefetch]);

    // useEffect(() => {
    //   if (data) {
    //     actions.receiveData({ key: setPlaylistFrom, data });
    //   }
    // }, [data, instance]);

    if (refetch || loading) {
      return <HorizontalListPlaceholder />;
    }

    const error = error || !Array.isArray(data) || data.length === 0;

    return (
      <>
        <Header title={title} onPress={handlePress} />
        {error ? <SearchError /> : <CardList data={data} />}
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
