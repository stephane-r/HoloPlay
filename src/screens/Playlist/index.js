import React, { useState } from 'react';
import PlaylistContainer from '../../containers/Playlist';
import Layout from '../../components/Layout';
import Spacer from '../../components/Spacer';
import Title from '../../components/Title';
import Button from '../../components/Forms/Button';
import DialogAddPlaylistContainer from '../../containers/DialogAddPlaylist';

const PlaylistScreen = props => {
  const [modalIsOpen, setToggleModal] = useState(false);
  const [playlist, setPlaylist] = useState(null);

  const toggleModal = async item => {
    if (item.id) {
      setPlaylist(item);
    }

    setToggleModal(!modalIsOpen);
  };

  return (
    <Layout navigate={props.navigation}>
      <Spacer height={20} />
      <Title
        level="2"
        title="Playlist" />
      <Spacer height={30} />
      <PlaylistContainer toggleModal={playlist => toggleModal(playlist)} />
      <Button
        title="Create playlist"
        onPress={toggleModal} />
      <DialogAddPlaylistContainer
        visible={modalIsOpen}
        toggleDialog={toggleModal}
        playlist={playlist}
      />
    </Layout>
  );
};

PlaylistScreen.path = 'playlist';

PlaylistScreen.navigationOptions = () => ({
  title: 'Playlist',
  linkName: 'Playlist'
});

export default PlaylistScreen;
