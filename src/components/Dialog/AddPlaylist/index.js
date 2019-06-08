// @flow
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import Button from '../../Forms/Button';
import { actions } from '../../../store';
import Input from '../../Forms/Input';
import Text from '../../Text';

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
    const playlistUpdated = { ...playlist, id: uuidv4(), sources: [] };

    await actions.createNewPlaylist(playlistUpdated);

    setPlaylist({});
    return toggleDialog(false);
  };

  const updatePlaylist = async () => {
    const playlistUpdated = {
      ...playlist,
      updatedAt: new Date()
    };

    await actions.updatePlaylist(playlistUpdated);

    setPlaylist({});
    return toggleDialog(false);
  };

  const submit = async () => {
    await actions.setPlaylistIsFecthing();

    if (playlist.id === null) {
      return createNewPlaylist();
    }

    return updatePlaylist();
  };

  return (
    <Dialog
      visible={visible}
      title="Add to playlist"
      animationType="slide"
      onTouchOutside={toggleDialog}>
      <View>
        <Text>Playlist name</Text>
        <Input
          onChangeText={setPlaylistName}
          placeholder="Playlist name"
          value={playlist.name}
        />
        <Button
          title={props.playlist ? 'Update' : 'Create'}
          isLoading={playlistIsFecthing}
          onPress={submit}
        />
        <Button
          title="Cancel"
          onPress={toggleDialog} />
      </View>
    </Dialog>
  );
};

export default DialogAddPlaylist;
