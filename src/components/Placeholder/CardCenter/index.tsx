import React, { memo } from 'react';
import CardList from '../../Card/List';
import PlaceholderCardSearchItem from '../Card';
import { ScrollView } from '../../Card/ScrollList';

const PlaceholderCardHorizontalList: React.FC = memo(() => (
  <ScrollView>
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
  </ScrollView>
));

export default PlaceholderCardHorizontalList;
