// @flow
import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { Picker } from 'react-native';
import { Paragraph, Dialog, Button, Portal } from 'react-native-paper';
import { actions } from '../../../store';
import GET_USER from '../../../graphql/query/user';
import { ADD_SOURCE_TO_PLAYLIST } from '../../../graphql/mutation/playlist';

type Props = {
  client: Object,
  toggleDialog: Function,
  visible: boolean,
  source: Object,
  playlists: Object,
  userId: number
};

const DialogAddToPlaylist = ({
  client,
  toggleDialog,
  visible,
  source,
  playlists,
  userId
}: Props) => {
  if (!playlists) {
    return null;
  }

  const [playlistId, setPlaylistId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const addSourceToPlaylist = () => {
    if (playlistId) {
      setLoading(true);

      const { sources } = playlists.find(p => p.id === playlistId);
      const sourcesUpdated = sources ? [...sources, source] : [source];

      client.mutate({
        mutation: ADD_SOURCE_TO_PLAYLIST,
        variables: {
          id: playlistId,
          sources: sourcesUpdated
        },
        refetchQueries: [
          {
            query: GET_USER,
            variables: { userId }
          }
        ]
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
            {playlists.map(({ name, id }, index) => (
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

export default withApollo(DialogAddToPlaylist);
