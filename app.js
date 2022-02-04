import { quickActionShortcutItems } from "./config/quickAction";
import App from "./src/components/App";
import * as Sentry from "@sentry/react-native";
import React, { useEffect } from "react";
import config from "react-native-config";
import "react-native-gesture-handler";
import { Button } from "react-native-paper";
import QuickActions from "react-native-quick-actions";

// QuickActions.isSupported((error, supported) => {
//   if (supported) {
//     return QuickActions.setShortcutItems(quickActionShortcutItems);
//   }

//   return error;
// });

export default () => {
  // if (store.sendErrorMonitoring) {
  //   Sentry.init({
  //     dsn: config.SENTRY_DSN_KEY
  //   });
  // }

  return <App />;
};
