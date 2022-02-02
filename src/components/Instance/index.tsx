import React, { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Divider, IconButton, Switch } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from '../../providers/Snackbar';
import { useAppSettings } from '../../providers/App';

interface Props {
  uri: string;
  isCustom: boolean;
}

export const Instance: React.FC<Props> = memo(({ uri, isCustom }) => {
  const { t } = useTranslation();
  const snackbar = useSnackbar();
  const { settings, setSettings } = useAppSettings();
  const current = settings.instance;
  const isCurrent = current === uri;

  const onPress = useCallback(() => {
    if (uri === current) {
      snackbar.show('You must select an Invidious Instance');
      return;
    }
    setSettings.setInstance(uri);
  }, [current, setSettings, snackbar, uri]);

  const onRemovePress = useCallback(() => {
    setSettings.removeCustomInstance(uri);
    setTimeout(
      () => snackbar.show(t('snackbar.removeCustomInstanceSuccess')),
      500
    );
  }, [uri, setSettings, snackbar, t]);

  return (
    <>
      <Divider />
      <View
        style={[
          styles.container, {
            paddingRight: isCurrent ? 18 : 13,
          }
        ]}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text numberOfLines={1}>{uri}</Text>
          {isCustom && (
            <>
              <Text style={{ paddingLeft: 6 }}>-</Text>
              <IconButton
                icon="delete"
                mode="contained"
                size={18}
                style={{ margin: 0 }}
                onPress={onRemovePress}
              />
            </>
          )}
        </View>
        <View>
          <Switch value={isCurrent} onValueChange={onPress} />
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingVertical: 10
  }
});