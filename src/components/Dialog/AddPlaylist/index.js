// @flow
import React, { useState, useEffect } from 'react';
import { Portal, Button, Dialog, TextInput } from 'react-native-paper';
import { withApollo } from 'react-apollo';
import { actions } from '../../../store';
import {
  CREATE_PLAYLIST,
  UPDATE_PLAYLIST
} from '../../../graphql/mutation/playlist';
import GET_USER from '../../../graphql/query/user';

type DialogAddPlaylistProps = {
  toggleDialog: Function,
  visible: boolean,
  client?: Object,
  userId: number,
  playlist?: Object
};

const playlistProps = {
  name: '',
  deleted: false
};

const DialogAddPlaylist = ({
  toggleDialog,
  visible,
  userId,
  client,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState(
    props.playlist ? props.playlist : playlistProps
  );

  const refetchQueries = [
    {
      query: GET_USER,
      variables: {
        userId
      }
    }
  ];

  useEffect(() => {
    if (props.playlist) {
      setPlaylist(props.playlist);
    }
  }, [props.playlist]);

  const setPlaylistName = async name => setPlaylist({ ...playlist, name });

  const createPlaylist = () => {
    const playlistName = playlist.name;
    const playlistUpdated = { ...playlistProps, ...playlist, sources: [] };

    client.mutate({
      mutation: CREATE_PLAYLIST,
      variables: { ...playlistUpdated, users: [userId] },
      refetchQueries
    });

    closeDialog();

    return setTimeout(
      () => actions.setFlashMessage(`${playlistName} was created.`),
      500
    );
  };

  const updatePlaylist = () => {
    client.mutate({
      mutation: UPDATE_PLAYLIST,
      variables: { ...playlist, users: [userId] },
      refetchQueries
    });

    closeDialog();

    return setTimeout(
      () => actions.setFlashMessage(`${playlist.name} was updated.`),
      500
    );
  };

  const submit = async () => {
    if (playlist.name && playlist.name !== '') {
      await setLoading(true);

      if (playlist.id) {
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

export default withApollo<DialogAddPlaylistProps>(DialogAddPlaylist);
