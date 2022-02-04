import React from 'react';
import { View } from 'react-native';
import { List, Text } from 'react-native-paper';
import { version } from '../../../package';
import { useTranslation } from 'react-i18next';

export const AppVersion: React.FC = ({ listItemStyle }) => {
  const { t } = useTranslation();

  if (listItemStyle) {
    return (
      <List.Item
        title={t('drawler.version')}
        description={version}
      />
    )
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 16 }}>
        <Text>{t('drawler.version')} {version}</Text>
      </View>
    </View>
  );
};