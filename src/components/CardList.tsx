import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from './Card/ScrollList';
import { Card, CardPlaceholder } from './Card';

export const CardList: React.FC = memo(
  ({ display = 'horizontal', ...props }) => {
    switch (display) {
      case 'horizontal':
        return <HorizontalList {...props} />;
      case 'grid':
        return <GridList {...props} />;
      default:
        return null;
    }
  }
);

const GridList = memo(({ data }) => {
  return (
    <View style={styles.list}>
      {data.map((item, index) => (
        <View key={item.videoId} style={{ width: '50%' }}>
          <Card
            data={item}
            // loopIndex={index}
            // setPlaylistFrom={FAVORIS_PLAYLIST_TITLE}
          />
        </View>
      ))}
    </View>
  );
});

export const GridListPlaceholder = memo(() => {
  return (
    <View style={styles.list}>
      <CardPlaceholder />
      <CardPlaceholder />
      <CardPlaceholder />
      <CardPlaceholder />
      <CardPlaceholder />
      <CardPlaceholder />
    </View>
  );
});

const HorizontalList = memo(({ data }) => {
  return (
    <ScrollView>
      {data.map((item, index) => (
        <View key={item.videoId} style={styles.cardContainer}>
          <Card
            data={item}
            // loopIndex={index}
            // setPlaylistFrom={setPlaylistFrom}
          />
        </View>
      ))}
    </ScrollView>
  );
});

export const HorizontalListPlaceholder = memo(() => {
  return (
    <ScrollView>
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
    </ScrollView>
  );
});

export const styles = StyleSheet.create({
  cardContainer: {
    width: 250,
    paddingTop: 16
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 23,
    marginHorizontal: -8
  }
});
