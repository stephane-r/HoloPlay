// @flow
import React from 'react';
import { ActivityIndicator } from 'react-native';
import ResultITem from '../Item';

type Props = {
  results: Array<Object>,
  user: Object,
  isFavoris?: boolean,
  onPress: Function
};

const ResultList = ({ results, user, isFavoris, onPress }: Props): Function => {
  if (results.length > 0) {
    return results.map((item, index) => (
      <ResultITem
        key={index}
        item={item}
        index={index}
        onPress={onPress}
        isFavoris={isFavoris || (user && user.favorisIds.includes(item.id))}
        playlist={user.playlist}
      />
    ));
  }

  return <ActivityIndicator />;
};

ResultList.defaultProps = {
  isFavoris: false
};

export default ResultList;
