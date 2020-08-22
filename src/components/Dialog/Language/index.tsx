import React, { useState } from 'react';
import { Dialog, Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { ApiRoutes } from '../../../constants';
import { View } from 'react-native';
import { actions } from '../../../store';
import fetchPlaylists from '../../../utils/fetchPlaylists';
import callApi from '../../../utils/callApi';
import useInvidiousInstances from '../../../hooks/useInvidiousInstances';
import { useTranslation } from 'react-i18next';

interface Props {
  value: string;
  visible: boolean;
  onDismiss: () => void;
  toggleDialog: () => void;
}

const DialogLanguage: React.FC<Props> = ({
  value,
  visible,
  onDismiss,
  toggleDialog
}) => {
  const [language, setLanguage] = useState<'en' | 'fr'>(value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const submit = async () => {
    setIsLoading(true);

    try {
      i18n.changeLanguage(language);
      await actions.setLanguage(language);
      toggleDialog();

      return setTimeout(
        () =>
          actions.setFlashMessage({
            message: t('flashMessage.updateLanguage')
          }),
        500
      );
    } catch (error) {
      return setTimeout(
        () =>
          actions.setFlashMessage({
            message: error.message
          }),
        500
      );
    } finally {
      toggleDialog();
      setIsLoading(false);
    }
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>{t('dialog.editLanguage.title')}</Dialog.Title>
      <Dialog.Content>
        <Picker selectedValue={language} onValueChange={setLanguage}>
          {/* TODO: Adding EN/FR array on constance with utils function for show full language name */}
          {['en', 'fr'].map((lng) => (
            <Picker.Item key={lng} label={lng} value={lng} />
          ))}
        </Picker>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>{t('common.button.cancel')}</Button>
        <Button loading={isLoading} onPress={submit}>
          {t('common.button.done')}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogLanguage;
