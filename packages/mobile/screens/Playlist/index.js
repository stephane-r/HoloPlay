import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import { actions, PlaylistContainer } from '@youtube-audio-player/core';
import { Input } from '@youtube-audio-player/components';

const uuidv4 = require('uuid/v4');

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
    this.loadPlaylist = this.loadPlaylist.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.submit = this.submit.bind(this);
  }

  async toggleModal(playlist) {
    if (playlist) {
      await this.loadPlaylist(playlist);
    }

    await this.setState({
      toggleModal: !this.state.toggleModal
    });
  }

  async handleChange(name) {
    const playlist = { ...this.state.playlist, name };

    await this.setState({
      playlist
    });
  }

  async createNewPlaylist() {
    const playlist = { ...this.state.playlist, id: uuidv4(), sources: [] };

    await actions.createNewPlaylist(playlist);

    this.setState({
      playlist: {}
    });
  }

  async loadPlaylist(playlist) {
    await this.setState({
      playlist
    });
  }

  async updatePlaylist() {
    const playlist = {
      ...this.state.playlist,
      updatedAt: new Date()
    };

    await actions.updatePlaylist(playlist);

    this.setState({
      playlist: {}
    });
  }

  submit() {
    if (this.state.playlist.id === null) {
      return this.createNewPlaylist();
    }

    return this.updatePlaylist();
  }

  render() {
    const { toggleModal } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Button
          title="Create playlist"
          onPress={this.toggleModal} />
        <PlaylistContainer
          toggleModal={playlist => this.toggleModal(playlist)}
        />
        {toggleModal && (
          <View>
            <Text>Playlist name</Text>
            <Input
              onChangeText={this.handleChange}
              placeholder="Playlist name"
              value={this.state.playlist.name}
            />
            <Button
              title="Create/update"
              onPress={this.submit} />
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
