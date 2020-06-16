import React, { useState, useEffect } from 'react';
import { Portal, Button, Dialog, TextInput } from 'react-native-paper';
import { actions } from '../../../store';
import useStore from '../../../hooks/useStore';
import { Playlist } from '../../../types';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import { Alert } from 'react-native';

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

  useEffect(() => {
    if (props.playlist) {
      setPlaylist(props.playlist);
    }
  }, [props.playlist]);

  const setPlaylistName = (name: string): void =>
    setPlaylist({ ...playlist, title: name });

  const createPlaylist = async (): Promise<any> => {
    const playlistName = playlist.title;

    try {
      await callApi({
        url: ApiRoutes.Playlists,
        method: 'POST',
        body: {
          title: playlist.title,
          privacy: 'public'
        }
      });

      actions.addPlaylist({
        title: playlist.title,
        privacy: 'public',
        videos: []
      });
    } catch (error) {
      console.log(error);
    }

    closeDialog();

    return setTimeout(
      () => actions.setFlashMessage(`${playlistName} was created.`),
      500
    );
  };

  const updatePlaylist = async () => {
    try {
      // Updating store before because this callApi return an error if success ...
      actions.updatePlaylist({
        ...playlist,
        title: playlist.title
      });
      actions.setFlashMessage(`${playlist.title} was updated.`);

      await callApi({
        url: ApiRoutes.PlaylistId(playlist.playlistId),
        method: 'PATCH',
        body: {
          title: playlist.title,
          privacy: 'public'
        }
      });
    } catch (error) {
      console.log(error);
      // actions.setFlashMessage(`Error : ${playlist.title} not updated.`);
    } finally {
      closeDialog();
    }
  };

  const submit = async (): Promise<any> => {
    if (playlist.title && playlist.title !== '') {
      setLoading(true);

      if (playlist.playlistId) {
        return updatePlaylist();
      }

      return createPlaylist();
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
        {/* @ts-ignore */}
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
          {/* @ts-ignore */}
          <Button onPress={closeDialog}>Cancel</Button>
          {/* @ts-ignore */}
          <Button onPress={submit} loading={loading}>
            {playlist?.playlistId ? 'Update' : 'Create'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddPlaylist;
