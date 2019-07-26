// @flow
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { withApollo } from 'react-apollo';
import Card from '../Layout';
// import { actions } from '../../../store';
import MenuSearchItem from '../../Menu/SearchItem';
import { ADD_TO_FAVORIS } from '../../../graphql/mutation/favoris';
import GET_USER from '../../../graphql/query/user';

type CardSearchItemProps = {
  client?: Object,
  favorisIds: Array<number>,
  favoris: Array<Object>,
  card: Object,
  item: Object,
  isFavoris: boolean,
  userId: number,
  addToPlaylist: Function
};

const CardSearchItem = ({
  client,
  item,
  isFavoris,
  addToPlaylist,
  userId,
  ...props
}) => {
  const AddOrRemoveToFavoris = () => {
    const refetchQueries = [
      {
        query: GET_USER,
        variables: { userId }
      }
    ];

    if (isFavoris) {
      return client.mutate({
        mutation: ADD_TO_FAVORIS,
        variables: {
          userId,
          favorisIds: props.favorisIds.filter(f => f !== item.id),
          favoris: props.favoris
            ? props.favoris.filter(f => f.id !== item.id)
            : []
        },
        refetchQueries
      });
    }

    return client.mutate({
      mutation: ADD_TO_FAVORIS,
      variables: {
        userId,
        favorisIds: [...props.favorisIds, item.id],
        favoris: props.favoris ? [...props.favoris, item] : [item]
      },
      refetchQueries
    });
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

export default withApollo<CardSearchItemProps>(CardSearchItem);
