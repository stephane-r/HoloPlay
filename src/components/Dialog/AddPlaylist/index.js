// @flow
import React, { useState, useEffect } from 'react';
import { Portal, Button, Dialog, TextInput } from 'react-native-paper';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { actions } from '../../../store';
import type { Mutation } from '../../../graphql';
// TODO: Test to create playlist with mutation
// TODO: https://graphql-code-generator.com/docs/plugins/flow

// $FlowFixMe
const uuidv4 = require('uuid/v4');

type Props = {
  toggleDialog: Function,
  visible: boolean,
  playlist?: Object
};

const playlistProps = {
  // id: null,
  // createAt: new Date(),
  // updatedAt: null,
  name: ''
};

const DialogAddPlaylist = ({ toggleDialog, visible, ...props }: Props) => {
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState(
    props.playlist ? props.playlist : playlistProps
  );
  // const [test] = useMutation(Mutation.createPlaylist, {
  //   data: { ...playlist, userIds: [1], sources: '' }
  // });

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

    // await actions.createNewPlaylist(playlistUpdated);
    // test();

    closeDialog();

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

    closeDialog();

    return setTimeout(
      () => actions.setFlashMessage(`${playlistName} was updated.`),
      500
    );
  };

  const submit = async () => {
    if (playlist.name && playlist.name !== '') {
      await setLoading(true);

      if (playlist.id) {
        return updatePlaylist();
      }

      return createNewPlaylist();
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
      <Dialog
        visible={visible}
        onDismiss={closeDialog}>
        <Dialog.Title>
          {playlist.id ? 'Update' : 'Create'} playlist
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
            loading={loading}>
            {playlist.id ? 'Update' : 'Create'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddPlaylist;
