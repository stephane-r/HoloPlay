import React, { memo, useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from './Card/ScrollList';
import { Card, CardPlaceholder } from './Card';
import { usePlayer } from '../providers/Player';
import { useEffect } from 'react';

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

const GridList = memo(({ data, setPlaylistFrom }) => {
  const { player } = usePlayer();

  const handlePress = useCallback(props => player.loadVideo(props), [player]);

  return (
    <View style={styles.list}>
      {data.map((item, index) => (
        <View
          key={`${item.videoId}-${index}-${setPlaylistFrom}`}
          style={{ width: '50%' }}>
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
      <View style={{ width: '50%' }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: '50%' }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: '50%' }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: '50%' }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: '50%' }}>
        <CardPlaceholder />
      </View>
      <View style={{ width: '50%' }}>
        <CardPlaceholder />
      </View>
    </View>
  );
});

const HorizontalList = memo(({ data, setPlaylistFrom }) => {
  const { player } = usePlayer();

  const handlePress = useCallback(props => player.loadVideo(props), [player]);

  return (
    <ScrollView>
      {data.map((item, index) => (
        <View
          key={`${item.videoId}-${index}-${setPlaylistFrom}`}
          style={styles.cardContainer}>
          <Card
            data={item}
            onPress={() => handlePress({ videoIndex: index, setPlaylistFrom })}
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
