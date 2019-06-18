// @flow
import * as React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Spacer from '../Spacer';
import Text from '../Text';
import Icon from '../Icon';
import { actions } from '../../store';

type SourceProps = {
  items: Array<Object>,
  playlistId: Number
};

const Source = ({ items, playlistId }: SourceProps) => {
  return (
    <>
      {items.map(item => (
        <View
          key={`${item.id}-${String(playlistId)}`}
          style={styles.container}>
          <TouchableNativeFeedback onPress={() => actions.loadSource()}>
            <View style={styles.line}>
              <Text
                numberOfLines={1}
                customStyle={{ width: '90%' }}>
                {item.title}
              </Text>
              <View style={{ marginLeft: 'auto', marginVertical: 5 }}>
                <Icon
                  name="Play"
                  width={20}
                  height={20} />
              </View>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() =>
              actions.removeSourceFromPlaylist({
                source: item,
                playlistId
              })
            }>
            <View style={{ paddingLeft: 10 }}>
              <Icon
                name="ArrowRight"
                style
                width={20}
                height={20} />
            </View>
          </TouchableNativeFeedback>
        </View>
      ))}
      <View style={{ width: '100%' }}>
        <Spacer height={10} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
