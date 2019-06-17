// @flow
import React from 'react';
import { Dimensions } from 'react-native';
import { Snackbar as PaperSnackBar } from 'react-native-paper';
import { actions } from '../../store';
import type { FlashMessageType } from '../../types';

type SnackbarProps = {
  flashMessage: FlashMessageType
};

const SNACKBAR_DURATION: number = 5000;

const Snackbar = ({ flashMessage }: SnackbarProps) => (
  <PaperSnackBar
    visible={flashMessage.visible}
    duration={SNACKBAR_DURATION}
    style={{ width: Dimensions.get('window').width - 32, margin: 16 }}
    onDismiss={() => actions.hideFlashMessage(false)}
    action={{
      label: 'Close',
      onPress: () => null
    }}>
    {flashMessage.message}
  </PaperSnackBar>
);

export default Snackbar;
