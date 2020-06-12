import React from 'react';
import CardList from '../../Card/List';
import PlaceholderCardSearchItem from '../Card';

const PlaceholderSearchList: React.FC = () => (
  <CardList>
    <PlaceholderCardSearchItem />
    <PlaceholderCardSearchItem />
    <PlaceholderCardSearchItem />
    <PlaceholderCardSearchItem />
    <PlaceholderCardSearchItem />
    <PlaceholderCardSearchItem />
  </CardList>
);

export default PlaceholderSearchList;
