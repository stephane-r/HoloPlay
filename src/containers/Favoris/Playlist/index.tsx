import React, { memo } from 'react';
import FavorisPlaylist from '../../../components/Favoris/List';
import { useFavorite } from '../../../providers/Favorite';

export const FavorisPlaylistContainer = memo(() => {
  const { state } = useFavorite();

  return (
    <FavorisPlaylist
      videos={state.favorisPlaylist?.videos ?? null}
      setPlaylistFrom="favoris"
    />
  );
});
