// @flow
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import CardList from '../../Card/List';
import CardSearchItem from '../../Card/SearchItem';
import DialogAddToPlaylistContainer from '../../../containers/DialogAddToPlaylist';

type Props = {
  results: Array<Object>,
  user: Object,
  isFavoris?: boolean,
  onPress: Function
};

const ResultList = ({ results, user, isFavoris, onPress }: Props): Function => {
  const [dialogIsShow, toggleDialog] = useState(false);
  const [source, setDialogSource] = useState(null);

  if (results.length === 0) {
    <ActivityIndicator />;
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
            <CardSearchItem
              key={index}
              index={index}
              card={card}
              item={item}
              onPress={onPress}
              addToPlaylist={item => {
                setDialogSource(item);
                toggleDialog(!dialogIsShow);
              }}
              isFavoris={
                isFavoris || (user && user.favorisIds.includes(item.id))
              }
            />
          );
        })}
      </CardList>
      <DialogAddToPlaylistContainer
        visible={dialogIsShow}
        toggleDialog={() => toggleDialog(!dialogIsShow)}
        source={source}
      />
    </>
  );
};

ResultList.defaultProps = {
  isFavoris: false
};

export default ResultList;
