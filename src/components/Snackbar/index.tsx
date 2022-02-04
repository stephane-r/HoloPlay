import React from "react";
import { Dimensions } from "react-native";
import { Snackbar as PaperSnackBar } from "react-native-paper";

import { Snackbar as SnackbarType } from "../../types";

interface Props {
  snackbar: SnackbarType;
}

const Snackbar: React.FC<Props> = ({ snackbar }) => {
  if (!snackbar) {
    return null;
  }

  return (
    <PaperSnackBar
      visible={snackbar.visible}
      style={{ width: Dimensions.get("window").width - 32, margin: 16 }}
      onDismiss={() => null}
      action={snackbar.action}
    >
      {snackbar.message}
    </PaperSnackBar>
  );
};

export default Snackbar;
