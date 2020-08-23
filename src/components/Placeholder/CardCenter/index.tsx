import React from 'react';
import CardList from '../../Card/List';
import PlaceholderCardSearchItem from '../Card';
import CardScrollList from '../../Card/ScrollList';

const PlaceholderCardHorizontalList: React.FC = () => (
  <CardScrollList>
    <PlaceholderCardSearchItem
      containerCustomStyle={{
        width: 250,
        paddingTop: 15
      }}
    />
    <PlaceholderCardSearchItem
      containerCustomStyle={{
        width: 250,
        paddingTop: 15
      }}
    />
    <PlaceholderCardSearchItem
      containerCustomStyle={{
        width: 250,
        paddingTop: 15
      }}
    />
    <PlaceholderCardSearchItem
      containerCustomStyle={{
        width: 250,
        paddingTop: 15
      }}
    />
    <PlaceholderCardSearchItem
      containerCustomStyle={{
        width: 250,
        paddingTop: 15
      }}
    />
    <PlaceholderCardSearchItem
      containerCustomStyle={{
        width: 250,
        paddingTop: 15
      }}
    />
  </CardScrollList>
);

export default PlaceholderCardHorizontalList;
