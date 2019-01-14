import React from 'react';
import { Text } from 'react-native';
import ResultITem from '../Item';

const ResultList = ({ results }) => {
  if (results.length > 0) {
    return results.map((item, index) => <ResultITem key={index} item={item} />);
  }

  return <Text>Aucun résultat</Text>;
};

export default ResultList;
