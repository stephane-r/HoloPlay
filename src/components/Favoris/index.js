// @flow
import React from 'react';
import { IconButton, Button } from 'react-native-paper';
import { useQuery } from 'react-apollo-hooks';
import { withApollo } from 'react-apollo';
import GET_USER from '../../graphql/query/user';
import { ADD_TO_FAVORIS } from '../../graphql/mutation/favoris';

type FavorisProps = {
  client: Object,
  userId: number,
  source: Object,
  buttonWithIcon: boolean
};

const Favoris = ({ client, userId, source, buttonWithIcon }) => {
  const { data, error, loading } = useQuery(GET_USER, {
    variables: { userId }
  });

  if (loading || error) {
    return null;
  }

  const AddOrRemoveToFavoris = () => {
    const refetchQueries = [
      {
        query: GET_USER,
        variables: { userId }
      }
    ];

    const favorisIds = Array.isArray(data.user.favorisIds)
      ? data.user.favorisIds
      : [];
    const favoris = Array.isArray(data.user.favoris) ? data.user.favoris : [];

    if (isFavoris) {
      return client.mutate({
        mutation: ADD_TO_FAVORIS,
        variables: {
          userId,
          favorisIds: favorisIds ? favorisIds.filter(f => f !== source.id) : [],
          favoris: favoris ? favoris.filter(f => f.id !== source.id) : []
        },
        refetchQueries
      });
    }

    return client.mutate({
      mutation: ADD_TO_FAVORIS,
      variables: {
        userId,
        favorisIds: [source.id, ...favorisIds],
        favoris: favoris ? [source, ...favoris] : [source]
      },
      refetchQueries
    });
  };

  const isFavoris =
    Array.isArray(data.user.favorisIds) &&
    data.user.favorisIds.includes(source.id);

  if (buttonWithIcon) {
    return (
      <Button
        icon={isFavoris ? 'favorite' : 'favorite-border'}
        color={isFavoris ? '#EE05F2' : '#607D8B'}
        size={20}
        uppercase={false}
        animated
        onPress={AddOrRemoveToFavoris}>
        Favoris
      </Button>
    );
  }

  return (
    <IconButton
      icon={isFavoris ? 'favorite' : 'favorite-border'}
      color={isFavoris ? '#EE05F2' : '#607D8B'}
      size={25}
      onPress={AddOrRemoveToFavoris}
      animated
    />
  );
};

Favoris.defaultProps = {
  buttonWithIcon: false
};

export default withApollo<FavorisProps>(Favoris);
