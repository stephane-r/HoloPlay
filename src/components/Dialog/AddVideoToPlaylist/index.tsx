import { Picker } from "@react-native-community/picker";
import React, { memo, useState } from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import "react-native-get-random-values";
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  TextInput,
  useTheme,
} from "react-native-paper";
import { v4 as uuidv4 } from "uuid";

import { ApiRoutes } from "../../../constants";
import { usePlaylist } from "../../../providers/Playlist";
import { Playlist, Video } from "../../../types";
import callApi from "../../../utils/callApi";
import { Spacer } from "../../Spacer";
import { playlistProps } from "../AddPlaylist";

interface Props {
  toggleDialog: () => void;
  visible: boolean;
  video: Video;
}

export const DialogAddVideoToPlaylist: React.FC<Props> = memo(
  ({ toggleDialog, visible, video }) => {
    const { t } = useTranslation();
    const [playlistId, setPlaylistId] = useState<null | string>(null);
    const [playlist, setPlaylist] = useState(playlistProps);
    const [isNewPlaylist, setIsNewPlaylist] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const { colors } = useTheme();
    const { state, playlist: playlistActions } = usePlaylist();

    if (!state.playlists) {
      return null;
    }

    const NEW_VALUE = {
      playlistId: null,
      title: t("dialog.addToPlaylist.newPlaylist"),
    };

    const handlePress = useCallback(async (): Promise<void> => {
      setLoading(true);

      await playlistActions.addVideo({
        playlistId: playlistId ?? uuidv4(),
        playlistTitle: playlist.title,
        video,
        isNew: isNewPlaylist,
      });

      setLoading(false);
      toggleDialog();
    }, [setLoading, playlistActions, video, playlist, playlistId]);

    const handleValueChange = useCallback(
      (value: string): void => {
        setIsNewPlaylist(!Boolean(value));
        setPlaylistId(value);
      },
      [setIsNewPlaylist, setPlaylistId]
    );

    const handleChangeText = useCallback(
      (title: string): vopid => setPlaylist({ ...playlist, title }),
      [setPlaylist]
    );

    return (
      <Portal>
        <Dialog visible={visible} onDismiss={toggleDialog}>
          <Dialog.Title>{t("dialog.addToPlaylist.title")}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{t("dialog.addToPlaylist.text")}</Paragraph>
            <Picker
              selectedValue={playlistId}
              style={{ height: 50, color: colors.text }}
              onValueChange={handleValueChange}
            >
              {[
                ...state.playlists.filter((p) => p.title !== "favoris"),
                NEW_VALUE,
              ].map(({ title, playlistId }, index) => (
                <Picker.Item key={index} label={title} value={playlistId} />
              ))}
            </Picker>
            {playlistId === null && (
              <>
                <Spacer height={10} />
                <Paragraph>{t("dialog.addToPlaylist.text2")}</Paragraph>
                <TextInput
                  mode="outlined"
                  label={t("dialog.createPlaylist.placeholder")}
                  value={playlist.title}
                  onChangeText={handleChangeText}
                />
              </>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={toggleDialog}>{t("common.button.cancel")}</Button>
            <Button
              onPress={handlePress}
              loading={loading}
              disabled={playlistId === null && playlist.title === ""}
            >
              {t("common.button.add")}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
);
