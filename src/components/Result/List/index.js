// @flow
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import { useQuery } from 'react-apollo-hooks';
import CardList from '../../Card/List';
import DialogAddToPlaylistContainer from '../../../containers/DialogAddToPlaylist';
import CardSearchItemContainer from '../../../containers/SearchItem';
import GET_FAVORIS_IDS from '../../../graphql/query/favorisIds';

type Props = {
  results: Array<Object>,
  user: Object,
  isFavoris?: boolean
};

const ResultList = ({ results, user, isFavoris }: Props): Function => {
  const [dialogIsShow, toggleDialog] = useState(false);
  const [source, setDialogSource] = useState(null);

  const { data, error, loading } = useQuery(GET_FAVORIS_IDS, {
    variables: { userId: 1 }
  });

  if (loading || error) {
    return null;
  }

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
              favorisIds={data.user.favorisIds}
              favoris={data.user.favoris}
              addToPlaylist={item => {
                setDialogSource(item);
                toggleDialog(!dialogIsShow);
              }}
              isFavoris={isFavoris || data.user.favorisIds.includes(item.id)}
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
