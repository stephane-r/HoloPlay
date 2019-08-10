// @flow
import React from 'react';
import { View } from 'react-native';
import Card from '../Layout';
import MenuSearchItem from '../../Menu/SearchItem';
import FavorisContainer from '../../../containers/Favoris';
import { actions } from '../../../store';

type CardSearchItemProps = {
  card: Object,
  item: Object,
  addToPlaylist: Function,
  setPlaylistFrom: string
};

const CardSearchItem = ({
  item,
  addToPlaylist,
  ...props
}: CardSearchItemProps) => {
  const loadSource = async index => {
    await actions.setPlaylistFrom(props.setPlaylistFrom);
    await actions.loadSource(index);

    return actions.showPlayer();
  };

  return (
    <Card
      {...props}
      onPress={loadSource}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          margin: -8
        }}>
        <FavorisContainer
          source={item}
          buttonWithIcon />
        <MenuSearchItem
          addToPlaylist={() => addToPlaylist(item)}
          downloadFile={() => alert('download')}
        />
      </View>
    </Card>
  );
};

export default CardSearchItem;
