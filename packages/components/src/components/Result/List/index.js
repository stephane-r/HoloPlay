import React from 'react';
import { Text } from 'react-native';
import ResultITem from '../Item';

const ResultList = ({ results, onPress }) => {
  if (results.length > 0) {
    return results.map((item, index) => (
      <ResultITem key={index} item={item} index={index} onPress={onPress} />
    ));
  }

  return <Text>Aucun résultat</Text>;
};

export default ResultList;
