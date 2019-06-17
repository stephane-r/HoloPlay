// @flow
import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { Button, Text } from 'react-native-paper';
// $FlowFixMe
import Icon from 'react-native-vector-icons/MaterialIcons';
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
          alignItems: 'center',
          flex: 1,
          margin: -8,
          marginRight: 0
        }}>
        <Button
          icon={isFavoris ? 'favorite' : 'favorite-border'}
          color={isFavoris ? '#2575f4' : '#607D8B'}
          mode="text"
          onPress={AddOrRemoveToFavoris}>
          Favoris
        </Button>
        <TouchableNativeFeedback onPress={() => addToPlaylist(item)}>
          <Text>
            <Icon
              name="add"
              size={25} />
          </Text>
        </TouchableNativeFeedback>
      </View>
    </Card>
  );
};

export default CardSearchItem;
