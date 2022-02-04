import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

import { useAppSettings } from "../../../providers/App";
import { useSnackbar } from "../../../providers/Snackbar";
import { Spacer } from "../../Spacer";

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export const DialogAddCustomInstance: React.FC<Props> = memo(
  ({ visible, onDismiss }) => {
    const [uri, setUri] = useState<string>("https://");
    const { t } = useTranslation();
    const { setSettings } = useAppSettings();
    const snackbar = useSnackbar();

    const IS_NOT_VALID_URI = !/(http(s?)):\/\//i.test(uri);

    const onSubmit = useCallback(async () => {
      try {
        setSettings.customInstance({
          isCustom: true,
          uri,
        });

        setTimeout(
          () => snackbar.show(t("snackbar.addCustomInstanceSuccess")),
          500
        );
      } catch (error) {
        setTimeout(
          () => snackbar.show(t("snackbar.invidiousInstanceTokenUpdated")),
          500
        );
      } finally {
        onDismiss();
      }
    }, [uri, onDismiss, setSettings, snackbar, t]);

    return (
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            setUri(null);
            onDismiss();
          }}
        >
          <Dialog.Title>{t("dialog.customInstance.title")}</Dialog.Title>
          <Dialog.Content>
            <Text>
              {t("dialog.customInstance.example")} :{" "}
              <Text style={{ fontWeight: "bold" }}>
                https://my-custom-invidious.com
              </Text>
            </Text>
            <Spacer height={20} />
            <TextInput
              mode="outlined"
              label={t("dialog.customInstance.placeholder")}
              value={uri}
              onChangeText={setUri}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onDismiss}>{t("common.button.cancel")}</Button>
            <Button disabled={IS_NOT_VALID_URI} onPress={onSubmit}>
              {t("common.button.done")}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
);
