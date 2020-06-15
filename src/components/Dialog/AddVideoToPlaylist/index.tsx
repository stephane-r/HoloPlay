// @flow
import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { Paragraph, Dialog, Button, Portal } from 'react-native-paper';
import { actions, Store } from '../../../store';
import useStore from '../../../hooks/useStore';
import { Video, Playlist } from '../../../types';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';

interface Props {
  toggleDialog: () => void;
  visible: boolean;
  video: Video;
  playlists: Playlist[];
}

const DialogAddVideoToPlaylist: React.FC<Props> = ({
  toggleDialog,
  visible,
  video,
  playlists
}) => {
  if (!playlists) {
    return null;
  }

  const store: Store = useStore();
  const [playlistId, setPlaylistId] = useState<null | string>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const addSourceToPlaylist = async (): Promise<any> => {
    if (playlistId) {
      setLoading(true);

      try {
        await callApi({
          url: ApiRoutes.Videos(playlistId),
          method: 'POST',
          body: {
            videoId: video.videoId
          }
        });
      } catch (error) {
        console.log(error);
      }

      actions.addToPlaylist({
        playlistId,
        video
      });

      setLoading(false);
      toggleDialog();
      return actions.setFlashMessage(
        `${video.title} has been added to your playlist.`
      );
    }

    return actions.setFlashMessage('You need to select a playlist.');
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog}>
        {/* @ts-ignore */}
        <Dialog.Title>Add to playlist</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Select the playlist to which you want to add your music.
          </Paragraph>
          <Picker
            selectedValue={playlistId}
            style={{ height: 50 }}
            onValueChange={(value) => setPlaylistId(value)}>
            {playlists.map(({ title, playlistId }, index) => (
              <Picker.Item key={index} label={title} value={playlistId} />
            ))}
          </Picker>
        </Dialog.Content>
        <Dialog.Actions>
          {/* @ts-ignore */}
          <Button onPress={toggleDialog}>Cancel</Button>
          {/* @ts-ignore */}
          <Button onPress={addSourceToPlaylist} loading={isLoading}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddVideoToPlaylist;
