// @flow
import React, { useState } from 'react';
import CardList from '../../Card/List';
import DialogAddToPlaylistContainer from '../../../containers/DialogAddToPlaylist';
import CardSearchItemContainer from '../../../containers/SearchItem';
import PlaceholderCardSearchItem from '../../Placeholder/Card';

type ResultListProps = {
  data: Array<Object>,
  playlists?: null | Array<Object>,
  favorisIds?: Array<number>,
  favoris?: Array<Object>,
  isFavoris: boolean,
  userId?: number,
  setPlaylistFrom: string,
  isSearching?: boolean
};

const defaultValue = {
  value: null,
  name: 'Choose playlist'
};

const ResultList = ({ data, ...props }) => {
  if (props.isSearching) {
    return (
      <CardList>
        <PlaceholderCardSearchItem />
        <PlaceholderCardSearchItem />
        <PlaceholderCardSearchItem />
        <PlaceholderCardSearchItem />
        <PlaceholderCardSearchItem />
        <PlaceholderCardSearchItem />
      </CardList>
    );
  }

  const [dialogIsShow, toggleDialog] = useState(false);
  const [source, setDialogSource] = useState(null);

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
            <CardSearchItemContainer
              {...props}
              key={index}
              index={index}
              card={card}
              item={item}
              addToPlaylist={item => {
                setDialogSource(item);
                toggleDialog(!dialogIsShow);
              }}
              isFavoris={
                props.isFavoris || props.favorisIds.includes(item.videoId)
              }
            />
          );
        })}
      </CardList>
      {props.playlists && (
        <DialogAddToPlaylistContainer
          visible={dialogIsShow}
          toggleDialog={() => toggleDialog(!dialogIsShow)}
          source={source}
          playlists={[defaultValue, ...props.playlists]}
          userId={props.userId}
        />
      )}
    </>
  );
};

ResultList.defaultProps = {
  isFavoris: false
};

export default React.memo<ResultListProps>(ResultList);
