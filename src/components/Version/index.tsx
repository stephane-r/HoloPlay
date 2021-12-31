import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, List, Text, TouchableRipple } from 'react-native-paper';
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
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <List.Item
          accessibilityStates={[]}
          title={t('drawler.version')}
          description={version}
        />
      </View>
      {updateAvailable && showUpdate && (
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}>
          <Button
            style={{ marginRight: 16 }}
            mode="contained"
            onPress={() => downloadApk()}>
            {t('drawler.updateAvailable')}
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: { marginTop: 'auto', padding: 10, fontSize: 11 }
});

export default AppVersion;
