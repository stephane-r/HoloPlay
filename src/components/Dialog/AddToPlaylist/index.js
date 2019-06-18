// @flow
import React, { useState } from 'react';
import { Picker, View, StyleSheet } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import Button from '../../Forms/Button';
import { actions } from '../../../store';

type Props = {
  toggleDialog: Function,
  visible: boolean,
  source: Object,
  user: Object
};

const DialogAddToPlaylist = ({
  toggleDialog,
  visible,
  source,
  user
}: Props) => {
  if (!user) {
    return null;
  }

  const [playlistId, setPlaylistId] = useState(user.playlist[0].id);
  const [isLoading, setLoading] = useState(false);

  const addSourceToPlaylist = async () => {
    setLoading(true);

    await actions.addSourceToPlaylist({
      source,
      playlistId
    });

    setLoading(false);
    return setTimeout(toggleDialog, 1000);
  };

  return (
    <Dialog
      visible={visible}
      title="Add to playlist"
      animationType="slide"
      onTouchOutside={toggleDialog}>
      <View>
        <Picker
          selectedValue={playlistId}
          style={{ height: 50 }}
          onValueChange={value => setPlaylistId(value)}>
          {user.playlist.map(({ name, id }) => (
            <Picker.Item
              key={id}
              label={name}
              value={id} />
          ))}
        </Picker>
        <View style={styles.actionsContainer}>
          <View style={styles.actionsWrapper}>
            <Button
              title="Cancel"
              onPress={toggleDialog} />
          </View>
          <View style={styles.actionsWrapper}>
            <Button
              title="Add"
              onPress={addSourceToPlaylist}
              isLoading={isLoading}
            />
          </View>
        </View>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    marginHorizontal: -8
  },
  actionsWrapper: {
    flex: 1,
    paddingHorizontal: 8
  }
});

export default DialogAddToPlaylist;
