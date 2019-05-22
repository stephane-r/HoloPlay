import React from 'react';
import { Text, View, Button } from 'react-native';
import { actions } from '../../../store';

const PlaylistItem = ({ playlist, toggleModal }) => (
  <View style={{ paddingVertical: 10, flex: 1 }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
      {playlist.name}
    </Text>
    {playlist.sources.lenth > 0 && (
      <Button
        title="Play this playlist"
        onPress={() => actions.playPlaylist(playlist.id)}
      />
    )}
    {playlist.sources.length > 0 ? (
      playlist.sources.map(item => {
        if (item && item.id) {
          return (
            <View
              key={item.id}
              style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text>{item.title}</Text>
              <Button
                title="Remove"
                onPress={() =>
                  actions.removeSourceFromPlaylist({
                    source: item,
                    playlistId: playlist.id
                  })
                }
              />
            </View>
          );
        }

        return null;
      })
    ) : (
      <Text>Playlist empty</Text>
    )}
    <View style={{ flexDirection: 'row' }}>
      <Button
        title="Remove playlist"
        color="#841584"
        onPress={() => actions.removePlaylist(playlist.id)}
      />
      <Button
        title="Edit"
        onPress={() => toggleModal(playlist)} />
    </View>
  </View>
);

export default PlaylistItem;
