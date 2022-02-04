import React from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";

interface Props {
  title: string;
  backgroundColor: string;
}

const Header: React.FC<Props> = ({ title, backgroundColor, children }) => (
  <View style={[styles.header, { backgroundColor }]}>
    <Title style={styles.title}>{title}</Title>
    {children && children}
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 80,
    marginBottom: -60,
  },
  title: {
    fontSize: 27,
    color: "white",
  },
});

export default Header;
