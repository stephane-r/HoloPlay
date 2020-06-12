// @flow
import React from 'react';
import { View } from 'react-native';
import Card from '../Layout';
import Menu from '../../Search/Menu';
import FavorisButtonContainer from '../../../containers/Favoris/Button';
import { actions } from '../../../store';
import { SearchVideo, Video } from '../../../types';

interface Props {
  card: {
    title: string;
    picture: string;
    duration: number;
  };
  video: SearchVideo;
  addToPlaylist: (item: any) => void;
  setPlaylistFrom: string;
}

const CardSearchItem: React.FC<Props> = ({
  video,
  addToPlaylist,
  setPlaylistFrom,
  ...props
}) => {
  const loadVideo = async (index: number): Promise<any> => {
    await actions.setPlaylistFrom(setPlaylistFrom);
    await actions.loadSource(index);

    return actions.showPlayer();
  };

  return (
    <Card {...props} onPress={loadVideo} alignment="vertical">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          margin: -8
        }}>
        <FavorisButtonContainer video={video} buttonWithIcon />
        <Menu
          addToPlaylist={(): void => addToPlaylist(video)}
          downloadFile={(): void => console.log('download')}
        />
      </View>
    </Card>
  );
};

export default CardSearchItem;
