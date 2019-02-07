// @flow
import React from 'react';
import { Text, TouchableOpacity, Image, Button, View } from 'react-native';
import { actions } from '@youtube-audio-player/core';

type Props = {
  item: Object,
  index: number,
  onPress: Function,
  isFavoris: boolean,
  playlist: Array<Object>
};

type State = {
  showPlaylist: boolean
};

class ResultItem extends React.PureComponent<Props, State> {
  state = {
    showPlaylist: false
  };

  constructor(props: Object) {
    super(props);
    this.togglePlaylist = this.togglePlaylist.bind(this);
  }

  togglePlaylist: Function;
  async togglePlaylist() {
    await this.setState({
      showPlaylist: !this.state.showPlaylist
    });
  }

  render() {
    const { item, index, onPress, isFavoris, playlist } = this.props;

    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10
        }}>
        <View>
          <TouchableOpacity
            onPress={() => onPress(index)}
            style={{ alignItems: 'flex-start' }}>
            <Image
              source={{ uri: item.thumbnails.default.url }}
              style={{
                width: item.thumbnails.default.width,
                height: item.thumbnails.default.height
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{item.title}</Text>
          <View style={{ flexDirection: 'row' }}>
            {!isFavoris ? (
              <Button
                title="Add to fav"
                onPress={() => actions.addSourceToFavoris(item)}
              />
            ) : (
              <Button
                title="Remove to fav"
                color="#841584"
                onPress={() => actions.removeSourceFromFavoris(item)}
              />
            )}
            <Button
              title="Add to playlist"
              color="#841584"
              onPress={this.togglePlaylist}
            />
          </View>
          {this.state.showPlaylist && (
            <View>
              {playlist.map(({ id, name }) => (
                <View
                  key={id}
                  style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1 }}>{name}</Text>
                  <Button
                    title="Add"
                    color="#841584"
                    onPress={() =>
                      actions.addSourceToPlaylist({
                        source: item,
                        playlistId: id
                      })
                    }
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default ResultItem;
