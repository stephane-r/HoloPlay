import React from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";

import { AppVersion } from "../../components/Version";
import { LoginForm } from "./form";

const LoginScreen: React.FC = () => {
  return (
    <ImageBackground
      source={require("../../../docs/logo.png")}
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
      resizeMode="cover"
    >
      <View style={[styles.container, {}]}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <LoginForm />
        </View>
        <AppVersion />
      </View>
    </ImageBackground>
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
