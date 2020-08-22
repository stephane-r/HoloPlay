import React, { useState } from 'react';
import { Picker } from '@react-native-community/picker';
import { Paragraph, Dialog, Button, Portal } from 'react-native-paper';
import { actions, Store } from '../../../store';
import useStore from '../../../hooks/useStore';
import { Video, Playlist } from '../../../types';
import callApi from '../../../utils/callApi';
import { ApiRoutes } from '../../../constants';
import useVideo from '../../../hooks/useVideo';
import { useTranslation } from 'react-i18next';

interface Props {
  toggleDialog: () => void;
  visible: boolean;
  video: Video;
  playlists: Playlist[];
}

const DialogAddVideoToPlaylist: React.FC<Props> = ({
  toggleDialog,
  visible,
  video,
  playlists
}) => {
  if (!playlists) {
    return null;
  }

  const { t } = useTranslation();
  const store: Store = useStore();
  const [playlistId, setPlaylistId] = useState<null | string>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { addVideoToPlaylist } = useVideo();

  const EMPTY_VALUE = {
    playlistId: null,
    title: t('dialog.addToPlaylist.selectPlaylist')
  };

  const onPress = () => {
    if (playlistId) {
      setLoading(true);

      addVideoToPlaylist(playlistId, video, () => {
        setLoading(false);
        toggleDialog();
      });
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={toggleDialog}>
        <Dialog.Title>{t('dialog.addToPlaylist.title')}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{t('dialog.addToPlaylist.text')}</Paragraph>
          <Picker
            selectedValue={playlistId}
            style={{ height: 50 }}
            onValueChange={(value) => setPlaylistId(value)}>
            {[EMPTY_VALUE, ...playlists].map(({ title, playlistId }, index) => (
              <Picker.Item key={index} label={title} value={playlistId} />
            ))}
          </Picker>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={toggleDialog}>{t('common.button.cancel')}</Button>
          <Button
            onPress={onPress}
            loading={isLoading}
            disabled={playlistId === null}>
            {t('common.button.add')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAddVideoToPlaylist;
