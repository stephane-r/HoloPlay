// @flow
import React, { useState } from 'react';
import { Picker } from 'react-native';
import { Paragraph, Dialog, Button, Portal } from 'react-native-paper';
import { actions } from '../../../store';

type Props = {
  toggleDialog: Function,
  visible: boolean,
  source: Object,
  playlist: Object
};

const DialogAddToPlaylist = ({
  toggleDialog,
  visible,
  source,
  playlist
}: Props) => {
  if (!playlist) {
    return null;
  }

  const [playlistId, setPlaylistId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const addSourceToPlaylist = async () => {
    if (playlistId) {
      setLoading(true);

      await actions.addSourceToPlaylist({
        source,
        playlistId
      });

      setLoading(false);
      toggleDialog();

      return actions.setFlashMessage(
        `${source.title} has been added to your playlist.`
      );
    }

    return actions.setFlashMessage('You need to select a playlist.');
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={toggleDialog}>
        <Dialog.Title>Add to playlist</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Select the playlist to which you want to add your music.
          </Paragraph>
          <Picker
            selectedValue={playlistId}
            style={{ height: 50 }}
            onValueChange={value => setPlaylistId(value)}>
            {playlist.map(({ name, id }, index) => (
              <Picker.Item
                key={index}
                label={name}
                value={id} />
            ))}
          </Picker>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={toggleDialog}>Cancel</Button>
          <Button
            onPress={addSourceToPlaylist}
            loading={isLoading}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddToPlaylist;
