import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import Card from '../Layout';
import { actions, Store } from '../../../store';
import Spacer from '../../Spacer';
import { CarouselPlayIcon, setCardItem } from '../../Carousel';
import Video from '../../Video';
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
}

const CardPlaylist: React.FC<Props> = ({
  totalSongs,
  playlist,
  toggleModal
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
      // Updating store before because this callApi return an error if success ...
      actions.removePlaylist(playlist.playlistId);
      actions.setFlashMessage(`${playlist.title} has been removed.`);

      await callApi({
        url: ApiRoutes.PlaylistId(playlist.playlistId),
        method: 'DELETE'
      });
    } catch (error) {
      console.log(error);
      // actions.setFlashMessage(
      //   `Error : ${playlist.title} has not been removed.`
      // );
    } finally {
      toggleDialog();
      setIsLoading(false);
    }
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

  const card = setCardItem(playlist);

  return (
    <>
      <Card
        card={card}
        alignment="horizontal"
        itemsRenderer={
          <Video
            videos={playlist.videos}
            onPlay={async (videoIndex: number) => {
              if (videoIndex !== null || videoIndex !== undefined) {
                try {
                  await actions.setPlaylistFrom(playlist.videos);
                  await actions.loadVideo(videoIndex);
                  actions.showPlayer();
                } catch (error) {
                  console.log(error);
                }
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
                  actions.loadVideo(0);
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
