// @flow
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, Divider } from 'react-native-paper';
import Spacer from '../Spacer';

type SourceProps = {
  items: Array<Object>,
  playlistId: Number,
  onRemove: Function,
  onPlay: Function
};

const Source = ({ items, playlistId, onPlay, onRemove }: SourceProps) => (
  <>
    {items.map((item, index) => (
      <View
        key={`${item.id}-${String(playlistId)}`}
        style={styles.container}>
        <View style={styles.line}>
          <Text
            numberOfLines={1}
            style={{ width: '75%', flex: 1 }}>
            {item.title}
          </Text>
          <IconButton
            icon="play-circle-outline"
            size={25}
            style={{ margin: 6 }}
            onPress={() => onPlay(index)}
          />
          <IconButton
            icon="delete"
            size={20}
            style={{ margin: 0 }}
            onPress={() => onRemove(item.id)}
          />
        </View>
        {index + 1 < items.length && (
          <View style={{ width: '100%', height: 1 }}>
            <Divider />
          </View>
        )}
      </View>
    ))}
    <View style={{ width: '100%' }}>
      <Spacer height={10} />
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  line: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default Source;
