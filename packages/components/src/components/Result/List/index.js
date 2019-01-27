// @flow
import React from 'react';
import { Text } from 'react-native';
import ResultITem from '../Item';

type Props = {
  results: Array<Object>,
  onPress: Function
};

const ResultList = ({ results, onPress }: Props): Function => {
  if (results.length > 0) {
    return results.map((item, index) => (
      <ResultITem
        key={index}
        item={item}
        index={index}
        onPress={onPress} />
    ));
  }

  return <Text>Aucun résultat</Text>;
};

export default ResultList;
