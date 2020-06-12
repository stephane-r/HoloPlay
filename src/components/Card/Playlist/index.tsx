import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Card from '../Layout';
import { actions, Store } from '../../../store';
import Spacer from '../../Spacer';
import { CarouselPlayIcon } from '../../Carousel';
import Video from '../../Source';
import DialogRemovePlaylist from '../../Dialog/RemovePlaylist';
import PlaylistMenu from '../../Playlist/Menu';
import useStore from '../../../hooks/useStore';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import { Playlist } from '../../../types';

interface Props {
  totalSongs: number;
  playlist: Playlist;
  toggleModal: (playlist: Playlist) => void;
  card: any;
}

const CardPlaylist: React.FC<Props> = ({
  totalSongs,
  playlist,
  toggleModal,
  ...props
}) => {
  const store: Store = useStore();
  const [dialogIsOpen, setToggleDialog] = useState(false);
  const [showItems, setToggleItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDialog = () => setToggleDialog(!dialogIsOpen);
  const toggleItems = () => setToggleItems(!showItems);

  const removePlaylist = async () => {
    setIsLoading(true);

    try {
      await callApi({
        url: ApiRoutes.PlaylistId(playlist.playlistId),
        method: 'DELETE'
      });
    } catch (error) {
      console.log(error);
    }

    actions.setFlashMessage(`${playlist.title} has been removed.`);
    toggleDialog();
    setIsLoading(false);
  };

  const removeVideo = async (videoIndexId: string) => {
    try {
      await callApi({
        url: ApiRoutes.VideoIndexId(playlist.playlistId, videoIndexId),
        method: 'DELETE'
      });
    } catch (error) {
      console.log(error);
    }

    actions.removeFromPlaylist({
      playlistId: playlist.playlistId,
      indexId: videoIndexId
    });

    return actions.setFlashMessage(`${videoIndexId} has been removed.`);
  };

  return (
    <>
      <Card
        {...props}
        alignment="horizontal"
        items={playlist.videos}
        itemsRenderer={
          <Video
            videos={playlist.videos}
            onPlay={async (videoIndex) => {
              if (videoIndex) {
                await actions.setPlaylistFrom(playlist.videos);
                await actions.loadSource(videoIndex);
                return actions.showPlayer();
              }
            }}
            onRemove={removeVideo}
            playlistId={playlist.playlistId}
          />
        }
        showItems={showItems}
        playlistId={playlist.playlistId}
        onPress={playlist.videos.length === 0 ? null : toggleItems}
        rightContent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: -30
            }}>
            {playlist.videos > 0 && (
              <CarouselPlayIcon
                onPress={async () => {
                  await actions.setPlaylistFrom(playlist.videos);
                  actions.loadSource(0);
                }}
              />
            )}
            <PlaylistMenu
              onEdit={() => toggleModal(playlist)}
              onRemove={toggleDialog}
            />
          </View>
        }>
        <Text accessibilityStates={[]}>
          {totalSongs} song{totalSongs > 1 && 's'}
        </Text>
      </Card>
      <Spacer height={10} />
      {/* TODO: Maybe remove this Dialog and import to screen parent ? */}
      <DialogRemovePlaylist
        visible={dialogIsOpen}
        toggleDialog={toggleDialog}
        onPress={removePlaylist}
        playlistName={playlist.title}
        loading={isLoading}
      />
    </>
  );
};

export default CardPlaylist;
