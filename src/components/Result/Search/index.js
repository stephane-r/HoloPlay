// @flow
import React, { useState, memo, useEffect } from 'react';
import CardList from '../../Card/List';
import useCallApi from '../../../hooks/useCallApi';
import CardSearchItem from '../../Card/SearchItem';
import DialogAddToPlaylist from '../../Dialog/AddToPlaylist';
import { actions } from '../../../store';

const ResultSearch = ({
  playlists,
  searchValue,
  searchType,
  setPlaylistFrom
}) => {
  const data = useCallApi(
    searchValue !== ''
      ? `search?q=${searchValue}&type=${searchType}`
      : 'popular'
  );
  const [dialogIsShow, toggleDialog] = useState(false);
  const [source, setDialogSource] = useState(null);

  useEffect(() => {
    if (data) {
      actions.setSearchResult(data);
    }
  }, [data]);

  return (
    <>
      <CardList>
        {data.map((item, index) => {
          const card = {
            title: item.title,
            picture: item.videoThumbnails.find(q => q.quality === 'medium').url,
            duration: item.lengthSeconds
          };

          return (
            <CardSearchItem
              key={item.playlistId}
              index={index}
              card={card}
              item={item}
              setPlaylistFrom={setPlaylistFrom}
              addToPlaylist={item => {
                setDialogSource(item);
                toggleDialog(!dialogIsShow);
              }}
              // isFavoris={
              //   props.isFavoris ||
              //   (Array.isArray(props.favorisIds) &&
              //     props.favorisIds.includes(item.id))
              // }
            />
          );
        })}
      </CardList>
      {playlists && (
        <DialogAddToPlaylist
          visible={dialogIsShow}
          toggleDialog={() => toggleDialog(!dialogIsShow)}
          source={source}
          playlists={playlists}
        />
      )}
    </>
  );
};

ResultSearch.defaultProps = {
  isFavoris: false
};

export default memo(ResultSearch);
