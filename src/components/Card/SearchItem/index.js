// @flow
import * as React from 'react';
import { View } from 'react-native';
import Icon from '../../Icon';
import Card from '../Layout';
import { actions } from '../../../store';

type Props = {
  card: Object,
  item: Object,
  isFavoris: boolean
};

const CardSearchItem = ({ item, isFavoris, ...props }: Props) => {
  const AddOrRemoveToFavoris = () => {
    if (isFavoris) {
      return actions.addSourceToFavoris(item);
    }

    return actions.removeSourceFromFavoris(item);
  };

  return (
    <Card {...props}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1
        }}>
        <Icon
          name={isFavoris ? 'Favorite' : 'FavoriteBorder'}
          width={20}
          height={20}
          onPress={AddOrRemoveToFavoris}
        />
        <Icon
          name="Add"
          width={20}
          height={20} />
      </View>
    </Card>
  );
};

export default CardSearchItem;
