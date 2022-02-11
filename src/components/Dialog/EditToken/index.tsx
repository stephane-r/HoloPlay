import AsyncStorage from "@react-native-community/async-storage";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

import { ApiRoutes } from "../../../constants";
import { useInvidiousInstances } from "../../../containers/InstanceList";
import { useAppSettings } from "../../../providers/App";
import { usePlaylist } from "../../../providers/Playlist";
import { useSnackbar } from "../../../providers/Snackbar";
import callApi from "../../../utils/callApi";
import fetchPlaylists from "../../../utils/fetchPlaylists";
import { InstanceField } from "../../Fields/InstanceField";
import { Spacer } from "../../Spacer";

interface Props {
  token: string;
  visible: boolean;
  onDismiss: () => void;
}

export const DialogEditToken: React.FC<Props> = ({
  token: initialToken,
  visible,
  onDismiss,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(
    `{"session":"v1:m4x-rPN0R4uY0YfmbskpeT6MpO7kbjsvwn_GiNdxcrg=","scopes":[":*"],"signature":"VPC20h1CpTltlife4zsBCmDoxfjah-F1qyWNMr9dU0Y="}`
  );
  const snackbar = useSnackbar();
  const { settings, setSettings } = useAppSettings();
  const [instance, setInstance] = useState(settings.instance);
  const { playlist } = usePlaylist();

  const onSubmit = useCallback(async () => {
    setLoading(true);

    const tokenIsSame = token === initialToken;
    const tokenIsEmpty = token === "";

    if (tokenIsSame) {
      // return onDismiss();
    }

    if (tokenIsEmpty) {
      await setSettings.setToken(token, instance);
      return onDismiss();
    }

    try {
      await setSettings.setToken(token, instance);
      await playlist.fetchPlaylists();
      // onDismiss();
      return setTimeout(() => snackbar.show(t("snackbar.importData")), 500);
    } catch (error) {
      snackbar.show(error.message);
    } finally {
      setLoading(false);
    }
  }, [onDismiss, token, initialToken, snackbar, t]);

  const handleChangeInstance = useCallback(
    (value) => {
      setInstance(value);
    },
    [setInstance]
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{t("dialog.editToken.title")}</Dialog.Title>
        <Dialog.Content>
          <InstanceField value={instance} onChange={handleChangeInstance} />
          <Spacer height={20} />
          <TextInput
            mode="outlined"
            label="Token"
            onChangeText={setToken}
            value={token}
          />
          {token === "" && (
            <>
              <Spacer height={15} />
              <Text>{t("dialog.editToken.emptyToken")}</Text>
            </>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>{t("common.button.cancel")}</Button>
          <Button
            onPress={onSubmit}
            loading={loading}
            // disabled={token === initialToken}
          >
            {t("common.button.saveAndUse")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
