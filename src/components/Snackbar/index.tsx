import React from 'react';
import { Dimensions } from 'react-native';
import { Snackbar as PaperSnackBar } from 'react-native-paper';
import { actions } from '../../store';
import { Snackbar as SnackbarType } from '../../types';

interface Props {
  snackbar: SnackbarType;
}

const SNACKBAR_DURATION: number = 5000;

const Snackbar: React.FC<Props> = ({ snackbar }) => {
  console.log(snackbar);
  return (
    <PaperSnackBar
      visible={snackbar.visible}
      duration={SNACKBAR_DURATION}
      style={{ width: Dimensions.get('window').width - 32, margin: 16 }}
      onDismiss={(): void => actions.hideSnackbar()}
      action={snackbar.action}>
      {snackbar.message}
    </PaperSnackBar>
  );
};

export default Snackbar;
