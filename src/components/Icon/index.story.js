import React from 'react';
import { View, StyleSheet }  from 'react-native';
import Icon from '.';
import Spacer from '../Spacer';

const IconStory = () => (
  <View style={styles.container}>
    {icons.map(({ name, height, width }, index) =>
      <View key={index} style={styles.item}>
        <Icon
          name={name}
          height={height}
          width={width} />
      </View>
    )}
  </View>
);

const icons = [
  {
    name: 'Search',
    height: "20",
    width: "20"
  },
  {
    name: 'Play',
    height: "20",
    width: "20"
  },
  {
    name: 'Headphone',
    height: "14",
    width: "10"
  },
  {
    name: 'Headset',
    height: "20",
    width: "20"
  },
  {
    name: 'Previous',
    height: "20",
    width: "20"
  },
  {
    name: 'Next',
    height: "20",
    width: "20"
  },
  {
    name: 'Pause',
    height: "20",
    width: "20"
  },
  {
    name: 'MoreVert',
    height: "20",
    width: "20"
  },
  {
    name: 'MoreHoriz',
    height: "20",
    width: "20"
  },
  {
    name: 'FavoriteBorder',
    height: "20",
    width: "20"
  },
  {
    name: 'Favorite',
    height: "20",
    width: "20"
  },
  {
    name: 'ArrowRight',
    height: "20",
    width: "20"
  },
  {
    name: 'ArrowTop',
    height: "20",
    width: "20"
  },
]

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: "13%",
    padding: 10
  }
})

export { IconStory };
