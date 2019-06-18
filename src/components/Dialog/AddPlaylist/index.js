// @flow
import React, { useState, useEffect } from 'react';
import { Portal, Button, Dialog, TextInput } from 'react-native-paper';
import { actions } from '../../../store';

// $FlowFixMe
const uuidv4 = require('uuid/v4');

type Props = {
  toggleDialog: Function,
  visible: boolean,
  playlistIsFecthing: boolean,
  playlist?: Object
};

const playlistProps = {
  id: null,
  createAt: new Date(),
  updatedAt: null,
  name: ''
};

const DialogAddPlaylist = ({
  playlistIsFecthing,
  toggleDialog,
  visible,
  ...props
}: Props) => {
  const [playlist, setPlaylist] = useState(
    props.playlist ? props.playlist : playlistProps
  );

  useEffect(() => {
    if (props.playlist) {
      setPlaylist(props.playlist);
    }
  }, [props.playlist]);

  const setPlaylistName = async name => {
    const playlistUpdated = { ...playlist, name };

    setPlaylist(playlistUpdated);
  };

  const createNewPlaylist = async () => {
    const playlistName = playlist.name;
    const playlistUpdated = { ...playlist, id: uuidv4(), sources: [] };

    await actions.createNewPlaylist(playlistUpdated);

    setPlaylist({});
    toggleDialog(false);

    return setTimeout(
      () => actions.setFlashMessage(`${playlistName} was created.`),
      500
    );
  };

  const updatePlaylist = async () => {
    const playlistName = playlist.name;
    const playlistUpdated = {
      ...playlist,
      updatedAt: new Date()
    };

    await actions.updatePlaylist(playlistUpdated);

    setPlaylist({});
    toggleDialog(false);

    return setTimeout(
      () => actions.setFlashMessage(`${playlistName} was updated.`),
      500
    );
  };

  const submit = async () => {
    if (playlist.name && playlist.name !== '') {
      await actions.setPlaylistIsFecthing();

      if (playlist.id === null) {
        return createNewPlaylist();
      }

      return updatePlaylist();
    }

    return actions.setFlashMessage('You must name your playlist.');
  };

  const closeDialog = () => {
    setPlaylist({});
    return toggleDialog(false);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={closeDialog}>
        <Dialog.Title>
          {playlist.id !== null ? 'Update' : 'Create'} playlist
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            label="Playlist name"
            value={playlist.name}
            onChangeText={setPlaylistName}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeDialog}>Cancel</Button>
          <Button
            onPress={submit}
            loading={playlistIsFecthing}>
            {playlist.id !== null ? 'Update' : 'Create'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddPlaylist;
