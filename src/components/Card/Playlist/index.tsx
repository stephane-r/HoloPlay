import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
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
import usePlaylist from '../../../hooks/usePlaylist';
import useVideo from '../../../hooks/useVideo';

interface Props {
  totalSongs: number;
  playlist: Playlist;
  playingVideoId: string;
  toggleModal: (playlist: Playlist) => void;
}

const CardPlaylist: React.FC<Props> = ({
  totalSongs,
  playlist,
  playingVideoId,
  toggleModal
}) => {
  const store: Store = useStore();
  const [dialogIsOpen, setToggleDialog] = useState(false);
  const [showItems, setToggleItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { removePlaylist } = usePlaylist();
  const { removeVideo } = useVideo();
  const { colors } = useTheme();

  const onPress = () => {
    setIsLoading(true);
    removePlaylist(playlist, () => {
      toggleDialog();
      setIsLoading(false);
    });
  };

  const toggleDialog = () => setToggleDialog(!dialogIsOpen);
  const toggleItems = () => setToggleItems(!showItems);

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
                } catch (error) {
                  console.log(error);
                  actions.setFlashMessage('Can not load video.');
                }
              }
            }}
            color={colors.text}
            onRemove={(videoIndexId: string) =>
              removeVideo(videoIndexId, playlist.playlistId)
            }
            playlistId={playlist.playlistId}
            playingVideoId={playingVideoId}
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
        onPress={onPress}
        playlistName={playlist.title}
        loading={isLoading}
      />
    </>
  );
};

export default CardPlaylist;
