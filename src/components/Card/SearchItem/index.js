// @flow
import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import Icon from '../../Icon';
import Card from '../Layout';
import { actions } from '../../../store';

type Props = {
  card: Object,
  item: Object,
  isFavoris: boolean,
  addToPlaylist: Function
};

const CardSearchItem = ({
  item,
  isFavoris,
  addToPlaylist,
  ...props
}: Props) => {
  const AddOrRemoveToFavoris = () => {
    if (isFavoris) {
      return actions.removeSourceFromFavoris(item);
    }

    return actions.addSourceToFavoris(item);
  };

  return (
    <Card {...props}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1
        }}>
        <TouchableHighlight onPress={AddOrRemoveToFavoris}>
          <Icon
            name={isFavoris ? 'Favorite' : 'FavoriteBorder'}
            width={15}
            height={15}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => addToPlaylist(item)}>
          <Icon
            name="Add"
            width={15}
            height={15} />
        </TouchableHighlight>
      </View>
    </Card>
  );
};

export default CardSearchItem;
