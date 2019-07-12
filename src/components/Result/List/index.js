// @flow
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import CardList from '../../Card/List';
import DialogAddToPlaylistContainer from '../../../containers/DialogAddToPlaylist';
import CardSearchItemContainer from '../../../containers/SearchItem';

type Props = {
  results: Array<Object>,
  user: Object,
  isFavoris?: boolean
};

const ResultList = ({ results, user, isFavoris }: Props): Function => {
  const [dialogIsShow, toggleDialog] = useState(false);
  const [source, setDialogSource] = useState(null);

  if (results.length === 0) {
    return <Text>No result.</Text>;
  }

  return (
    <>
      <CardList>
        {results.map((item, index) => {
          const card = {
            title: item.title,
            picture: item.thumbnails.default.url
          };

          return (
            <CardSearchItemContainer
              key={index}
              index={index}
              card={card}
              item={item}
              addToPlaylist={item => {
                setDialogSource(item);
                toggleDialog(!dialogIsShow);
              }}
              isFavoris={
                isFavoris ||
                (user && user.favorisIds && user.favorisIds.includes(item.id))
              }
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
