import React from 'react';
import { View } from 'react-native';
import CardLayout from '.';
import CardList from '../List';

const cardList = [
  {
    title: 'title',
    picture: 'https://picsum.photos/200/100',
    songsCount: 26
  },
  {
    title: 'title',
    picture: 'https://picsum.photos/200/100',
    songsCount: 26
  },
  {
    title: 'title',
    picture: 'https://picsum.photos/200/100',
    songsCount: 26
  }
];

const CardHorizontalStory = () => (
  <View style={{ paddingVertical: 20 }}>
    {cardList.map((item, index) => (
      <CardLayout
        key={index}
        card={item} />
    ))}
  </View>
);

const CardVerticalStory = () => (
  <CardList>
    {cardList.map((item, index) => (
      <CardLayout
        alignment="horizontal"
        key={index}
        card={item} />
    ))}
  </CardList>
);

export { CardHorizontalStory, CardVerticalStory };
