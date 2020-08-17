import React from 'react';
import { Dimensions } from 'react-native';
import { Snackbar as PaperSnackBar } from 'react-native-paper';
import { actions } from '../../store';
import { FlashMessage } from '../../types';

interface Props {
  flashMessage: FlashMessage;
}

const SNACKBAR_DURATION: number = 5000;

const Snackbar: React.FC<Props> = ({ flashMessage }) => (
  <PaperSnackBar
    visible={flashMessage.visible}
    duration={SNACKBAR_DURATION}
    style={{ width: Dimensions.get('window').width - 32, margin: 16 }}
    onDismiss={(): void => actions.hideFlashMessage(false)}
    action={flashMessage.action}>
    {flashMessage.message}
  </PaperSnackBar>
);

export default Snackbar;
