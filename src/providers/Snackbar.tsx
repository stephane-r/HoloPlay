import Snackbar from "../components/Snackbar";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { createContext } from "react";

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState(null);

  const defaultAction = useMemo(
    () => ({
      label: "OK",
      onPress: () => setSnackbar(null),
    }),
    [setSnackbar]
  );

  const showSnackbar = useCallback(
    (message = "", { action, dismissDelay = 3000 }) => {
      const snackbar = {
        message,
        visible: true,
        action: action ?? defaultAction,
      };

      setSnackbar(snackbar);

      return setTimeout(
        () => setSnackbar((snackbar) => ({ ...snackbar, visible: false })),
        dismissDelay
      );
    },
    [defaultAction, setSnackbar]
  );

  const value = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar snackbar={snackbar} />
    </SnackbarContext.Provider>
  );
};

const defaultOptions = {
  action: null,
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  const snackbar = useMemo(
    () => ({
      show: (message, options = {}) =>
        context.showSnackbar(message, { ...defaultOptions, ...options }),
    }),
    [context]
  );

  return snackbar;
};
