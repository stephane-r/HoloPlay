// @flow
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import Card from '../Layout';
import { actions } from '../../../store';
import MenuSearchItem from '../../Menu/SearchItem';

type CardSearchItemProps = {
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
}: CardSearchItemProps) => {
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
          alignItems: 'center',
          flex: 1,
          margin: -8
        }}>
        <Button
          icon={isFavoris ? 'favorite' : 'favorite-border'}
          color={isFavoris ? '#EE05F2' : '#607D8B'}
          size={20}
          uppercase={false}
          animated
          onPress={AddOrRemoveToFavoris}>
          Favoris
        </Button>
        <MenuSearchItem
          addToPlaylist={() => addToPlaylist(item)}
          downloadFile={() => alert('download')}
        />
      </View>
    </Card>
  );
};

export default CardSearchItem;
