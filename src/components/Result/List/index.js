// @flow
import React from 'react';
import { ActivityIndicator } from 'react-native';
import CardList from '../../Card/List';
import CardSearchItem from '../../Card/SearchItem';

type Props = {
  results: Array<Object>,
  user: Object,
  isFavoris?: boolean,
  onPress: Function
};

const ResultList = ({ results, user, isFavoris, onPress }: Props): Function => {
  if (results.length === 0) {
    <ActivityIndicator />;
  }

  return (
    <CardList>
      {results.map((item, index) => {
        const card = {
          title: item.title,
          picture: item.thumbnails.default.url
        };

        return (
          <CardSearchItem
            key={index}
            index={index}
            card={card}
            item={item}
            onPress={onPress}
            isFavoris={isFavoris || (user && user.favorisIds.includes(item.id))}
          />
        );
      })}
    </CardList>
  );
};

ResultList.defaultProps = {
  isFavoris: false
};

export default ResultList;
