// @flow
import React, { useState } from 'react';
import { Picker } from 'react-native';
import { Paragraph, Dialog, Button, Portal } from 'react-native-paper';
import { actions } from '../../../store';
import useStore from '../../../hooks/useStore';

type DialogAddToPlaylistProps = {
  client: Object,
  toggleDialog: Function,
  visible: boolean,
  source: Object,
  playlists: Object
};

const DialogAddToPlaylist = ({ toggleDialog, visible, source, playlists }) => {
  if (!playlists) {
    return null;
  }

  const store = useStore();
  const [playlistId, setPlaylistId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const addSourceToPlaylist = async () => {
    if (playlistId) {
      setLoading(true);

      try {
        await fetch(
          `${store.instance}/api/v1/auth/playlists/${playlistId}/videos`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${store.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              videoId: source.videoId
            })
          }
        );
      } catch (error) {
        console.log(error);
      }

      actions.addToPlaylist({
        playlistId,
        video: source
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
      <Dialog visible={visible} onDismiss={toggleDialog}>
        <Dialog.Title>Add to playlist</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Select the playlist to which you want to add your music.
          </Paragraph>
          <Picker
            selectedValue={playlistId}
            style={{ height: 50 }}
            onValueChange={value => setPlaylistId(value)}>
            {playlists.map(({ title, playlistId }, index) => (
              <Picker.Item key={index} label={title} value={playlistId} />
            ))}
          </Picker>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={toggleDialog}>Cancel</Button>
          <Button onPress={addSourceToPlaylist} loading={isLoading}>
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddToPlaylist;
