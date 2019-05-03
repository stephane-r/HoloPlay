import React from 'react';
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
  <CardList>
    {cardList.map((item, index) => (
      <CardLayout
        key={index}
        card={item} />
    ))}
  </CardList>
);

const CardVerticalStory = () => (
  <CardList>
    {cardList.map((item, index) => (
      <CardLayout
        key={index}
        card={item} />
    ))}
  </CardList>
);

export { CardHorizontalStory, CardVerticalStory };
