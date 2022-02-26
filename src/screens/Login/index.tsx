import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";

import { AppVersion } from "../../components/AppVersion";
import { LoginForm } from "./form";

const LoginScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <Image
            source={require("../../../docs/logo.png")}
            style={{ width: 126, height: 126 }}
          />
        </View>
        <LoginForm />
      </View>
      <AppVersion />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});

export default LoginScreen;
