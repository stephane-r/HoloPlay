// @flow
import React from 'react';
import { View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Card from '../Layout';
import { actions } from '../../../store';

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
          color={isFavoris ? '#2575f4' : '#607D8B'}
          mode="text"
          onPress={AddOrRemoveToFavoris}>
          Favoris
        </Button>
        <IconButton
          animated
          icon="add"
          style={{ width: 24, height: 24 }}
          onPress={() => addToPlaylist(item)}
        />
      </View>
    </Card>
  );
};

export default CardSearchItem;
