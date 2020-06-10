// @flow
import React, { useState, useEffect } from 'react';
import { Portal, Button, Dialog, TextInput } from 'react-native-paper';
import { actions } from '../../../store';
import useStore from '../../../hooks/useStore';

type DialogAddPlaylistProps = {
  toggleDialog: Function,
  visible: boolean,
  playlist?: Object
};

const playlistProps = {
  title: '',
  privacy: 'public'
};

const DialogAddPlaylist = ({ toggleDialog, visible, ...props }) => {
  const store = useStore();
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState(
    props.playlist ? props.playlist : playlistProps
  );

  useEffect(() => {
    console.log(props.playlist);
    if (props.playlist) {
      setPlaylist(props.playlist);
    }
  }, [props.playlist]);

  const setPlaylistName = async name =>
    setPlaylist({ ...playlist, title: name });

  const createPlaylist = async () => {
    const playlistName = playlist.title;

    try {
      await fetch(`${store.instance}/api/v1/auth/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${store.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: playlist.title,
          privacy: 'public'
        })
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
      await fetch(
        `${store.instance}/api/v1/auth/playlists/${playlist.playlistId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${store.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: playlist.title,
            privacy: 'public'
          })
        }
      );

      actions.updatePlaylist({
        ...playlist,
        title: playlist.title
      });
    } catch (error) {
      console.log(error);
    }

    closeDialog();

    return setTimeout(
      () => actions.setFlashMessage(`${playlist.title} was updated.`),
      500
    );
  };

  const submit = async () => {
    if (playlist.title && playlist.title !== '') {
      setLoading(true);

      if (playlist.playlistId) {
        return updatePlaylist();
      }

      return createPlaylist();
    }

    return actions.setFlashMessage('You must name your playlist.');
  };

  const closeDialog = () => {
    setLoading(false);
    toggleDialog(false);
    setTimeout(() => setPlaylist({}), 600);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeDialog}>
        <Dialog.Title>
          {playlist.playlistId ? 'Update' : 'Create'} playlist
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            label="Playlist name"
            value={playlist.title}
            onChangeText={setPlaylistName}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeDialog}>Cancel</Button>
          <Button onPress={submit} loading={loading}>
            {playlist.playlistId ? 'Update' : 'Create'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddPlaylist;
