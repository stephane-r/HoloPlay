import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { Paragraph, Dialog, Button, Portal } from 'react-native-paper';
import { actions, Store } from '../../../store';
import useStore from '../../../hooks/useStore';
import { Video, Playlist } from '../../../types';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import useVideo from '../../../hooks/useVideo';

interface Props {
  toggleDialog: () => void;
  visible: boolean;
  video: Video;
  playlists: Playlist[];
}

const EMPTY_VALUE = {
  playlistId: null,
  title: 'Choose playlist'
};

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
  const { addVideoToPlaylist } = useVideo();

  const onPress = () => {
    if (playlistId) {
      setLoading(true);

      addVideoToPlaylist(playlistId, video, () => {
        setLoading(false);
        toggleDialog();
      });
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog}>
        <Dialog.Title>Add to playlist</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Select the playlist to which you want to add your music.
          </Paragraph>
          <Picker
            selectedValue={playlistId}
            style={{ height: 50 }}
            onValueChange={(value) => setPlaylistId(value)}>
            {[EMPTY_VALUE, ...playlists].map(({ title, playlistId }, index) => (
              <Picker.Item key={index} label={title} value={playlistId} />
            ))}
          </Picker>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={toggleDialog}>Cancel</Button>
          <Button onPress={onPress} loading={isLoading}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddVideoToPlaylist;
