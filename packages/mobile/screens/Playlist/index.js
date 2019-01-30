import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import { actions } from '@youtube-audio-player/core';
import { Input } from '@youtube-audio-player/components';

class PlaylistScreen extends React.Component {
  state = {
    toggleModal: false,
    playlist: {
      id: null,
      createAt: new Date(),
      updatedAt: null,
      name: ''
    }
  };

  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
  }

  toggleModal() {
    this.setState({
      toggleModal: !this.state.toggleModal
    });
  }

  handleChange(name) {
    const playlist = { ...this.state.playlist, name };

    this.setState({
      playlist
    });
  }

  async createNewPlaylist() {
    const playlist = { ...this.state.playlist, id: 'TODO' };

    await this.setState({
      playlist
    });

    return actions.createNewPlaylist(this.state.playlist);
  }

  render() {
    const { toggleModal, playlist } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Button
          title="Create playlist"
          onPress={this.toggleModal} />
        {toggleModal && (
          <View>
            <Text>Playlist name</Text>
            <Input
              onTextChange={this.handleChange}
              placeholder="Playlist name"
              value={playlist.name}
            />
            <Button
              title="Create"
              onPress={this.createNewPlaylist} />
            <Button
              title="Cancel"
              onPress={this.toggleModal} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default PlaylistScreen;
