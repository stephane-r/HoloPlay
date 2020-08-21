import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { version } from '../../../package';
import useUpdateRelease from '../../hooks/useUpdateRelease';
import { useTranslation } from 'react-i18next';

interface Props {
  customStyle?: {
    [key: string]: string | number;
  };
  showUpdate: boolean;
}

const AppVersion: React.FC<Props> = ({ customStyle, showUpdate = true }) => {
  const { t } = useTranslation();
  const { updateAvailable, downloadApk } = useUpdateRelease();

  return (
    <View
      style={{
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: showUpdate ? 'flex-start' : 'center'
      }}>
      <Text accessibilityStates={[]} style={[styles.text, customStyle]}>
        {t('drawler.version')} {version}
      </Text>
      {updateAvailable && showUpdate && (
        <TouchableRipple onPress={downloadApk}>
          <Text
            accessibilityStates={[]}
            style={[styles.text, customStyle, { fontWeight: 'bold' }]}>
            {t('drawler.updateAvailable')}
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
