import React, { useState, useEffect } from 'react';
import { Portal, Button, Dialog, TextInput } from 'react-native-paper';
import { actions } from '../../../store';
import useStore from '../../../hooks/useStore';
import { Playlist } from '../../../types';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import { Alert } from 'react-native';
import usePlaylist from '../../../hooks/usePlaylist';

interface Props {
  toggleDialog: (value: null | Playlist) => void;
  visible: boolean;
  playlist: Playlist;
}

const playlistProps = {
  title: '',
  privacy: 'public'
};

const DialogAddPlaylist: React.FC<Props> = ({
  toggleDialog,
  visible,
  ...props
}) => {
  const store = useStore();
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState(props.playlist ?? playlistProps);
  const { createPlaylist, updatePlaylist } = usePlaylist();

  useEffect(() => {
    if (props.playlist) {
      setPlaylist(props.playlist);
    }
  }, [props.playlist]);

  const setPlaylistName = (name: string): void =>
    setPlaylist({ ...playlist, title: name });

  const submit = async (): Promise<any> => {
    if (playlist.title && playlist.title !== '') {
      setLoading(true);

      if (playlist.playlistId) {
        return updatePlaylist(playlist, closeDialog);
      }

      return createPlaylist(playlist, closeDialog);
    }

    return actions.setFlashMessage('You must name your playlist.');
  };

  const closeDialog = (): void => {
    setLoading(false);
    toggleDialog(null);
    setTimeout(() => setPlaylist(playlistProps), 600);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeDialog}>
        <Dialog.Title>
          {playlist?.playlistId ? 'Update' : 'Create'} playlist
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            accessibilityStates={[]}
            mode="outlined"
            label="Playlist name"
            value={playlist.title}
            onChangeText={setPlaylistName}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeDialog}>Cancel</Button>
          <Button onPress={submit} loading={loading}>
            {playlist?.playlistId ? 'Update' : 'Create'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddPlaylist;
