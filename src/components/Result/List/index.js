// @flow
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import CardList from '../../Card/List';
import DialogAddToPlaylistContainer from '../../../containers/DialogAddToPlaylist';
import CardSearchItemContainer from '../../../containers/SearchItem';

type ResultListProps = {
  data: Array<Object>,
  favorisIds?: Array<number>,
  favoris?: Array<Object>,
  isFavoris: boolean
};

const ResultList = ({ data, ...props }: ResultListProps) => {
  const [dialogIsShow, toggleDialog] = useState(false);
  const [source, setDialogSource] = useState(null);

  if (!data) {
    return <Text>No result.</Text>;
  }

  return (
    <>
      <CardList>
        {data.map((item, index) => {
          const card = {
            title: item.title,
            picture: item.thumbnails.default.url
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
              isFavoris={props.isFavoris || props.favorisIds.includes(item.id)}
            />
          );
        })}
      </CardList>
      {/* <DialogAddToPlaylistContainer
        visible={dialogIsShow}
        toggleDialog={() => toggleDialog(!dialogIsShow)}
        source={source}
      /> */}
    </>
  );
};

ResultList.defaultProps = {
  isFavoris: false
};

export default ResultList;
