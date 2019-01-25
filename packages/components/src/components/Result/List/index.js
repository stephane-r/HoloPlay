import React from 'react';
import { Text } from 'react-native';
import ResultITem from '../Item';

const ResultList = ({ results, user, onPress }) => {
  if (results.length > 0) {
    return results.map((item, index) => (
      <ResultITem
        key={index}
        item={item}
        index={index}
        onPress={onPress}
        isFavoris={user.favorisIds.includes(item.id)}
      />
    ));
  }

  return <Text>Aucun résultat</Text>;
};

export default ResultList;
