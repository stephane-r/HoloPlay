import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { version } from '../../../package';
import useUpdateRelease from '../../hooks/useUpdateRelease';

interface Props {
  customStyle?: {
    [key: string]: string | number;
  };
}

const AppVersion: React.FC<Props> = ({ customStyle }) => {
  const { updateAvailable, downloadApk } = useUpdateRelease();

  return (
    <View
      style={{
        marginTop: 'auto',
        flexDirection: 'row'
      }}>
      <Text accessibilityStates={[]} style={[styles.text, customStyle]}>
        Version {version}
      </Text>
      {updateAvailable && (
        <TouchableRipple onPress={downloadApk}>
          <Text
            accessibilityStates={[]}
            style={[styles.text, customStyle, { fontWeight: 'bold' }]}>
            New update available
          </Text>
        </TouchableRipple>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: { marginTop: 'auto', padding: 10, fontSize: 11 }
});

export default AppVersion;
