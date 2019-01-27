// @flow
import React from 'react';
import { Text } from 'react-native';
import ResultITem from '../Item';

type Props = {
  results: Array<Object>,
  user: Object,
  onPress: Function
};

const ResultList = ({ results, user, onPress }: Props) => {
  if (results.length > 0) {
    return results.map((item, index) => (
      <ResultITem
        key={index}
        item={item}
        index={index}
        onPress={onPress}
        isFavoris={user && user.favorisIds.includes(item.id)}
    ));
  }

  return <Text>Aucun résultat</Text>;
};

export default ResultList;
