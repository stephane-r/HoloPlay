import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import LayoutSpacerContainer from '../../containers/LayoutSpacer';

interface LayoutProps {
  setTheme: (value: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ setTheme, children }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.container]}>{children}</View>
      </ScrollView>
      <LayoutSpacerContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16
  }
});

export default Layout;
