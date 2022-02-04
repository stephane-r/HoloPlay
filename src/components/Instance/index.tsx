import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Divider, IconButton, Switch, Menu } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from '../../providers/Snackbar';
import { useAppSettings } from '../../providers/App';
import { useQuery } from 'react-query';

interface Props {
  uri: string;
  isCustom: boolean;
}

export const Instance: React.FC<Props> = memo(({ uri, isCustom }) => {
  const [apiState, setApiState] = useState(null);
  const { t } = useTranslation();
  const snackbar = useSnackbar();
  const { settings, setSettings } = useAppSettings();
  const [fetchInstance, setFetchInstance] = useState(true);
  const { isLoading } = useQuery(`${uri}-api-stats`, () => fetch(`${uri}/api/v1/popular`), {
    enabled: fetchInstance,
    onSuccess: (data) => {
      setFetchInstance(false);

      if (!data || data.status !== 200) {
        setApiState('error');
        return;
      }

      setApiState('enabled');
    },
  });

  const current = settings.instance;
  const isCurrent = current === uri;

  const handleRemoveCustomInstance = useCallback(() => {
    setSettings.removeCustomInstance(uri);
    setTimeout(
      () => snackbar.show(t('snackbar.removeCustomInstanceSuccess')),
      500
    );
  }, [uri, setSettings, snackbar, t]);

  const handlePress = useCallback(() => {
    if (uri === current) {
      snackbar.show('You must select an Invidious Instance');
      return;
    }
    setSettings.setInstance(uri);
  }, [current, setSettings, snackbar, uri]);

  const handleFetchInstance = useCallback(() => {
    setFetchInstance(true);
  }, [setFetchInstance]);

  const apiEnabled = apiState === 'enabled';

  return (
    <>
      <Divider />
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 24 }}>
          <View>
            <Text numberOfLines={1}>{uri}</Text>
            {!apiEnabled && (
              <View style={{ flexDirection: 'row' }}>
                <Text numberOfLines={1}>API not responding - </Text>
                <TouchableOpacity onPress={handleFetchInstance}>
                  <Text>Retry</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: isCustom ? 4 : 13, }}>
          {isLoading ? (
            <Text>LOADING</Text>
          ) : (
            <View>
              <Switch value={isCurrent} disabled={!apiEnabled} onValueChange={handlePress} />
            </View>
          )}
        </View>
          {isCustom && (
            <InstanceMenu onRemove={handleRemoveCustomInstance} />
          )}
      </View>
    </>
  );
});

const InstanceMenu = memo(({ onRemove }) => {
  const [menuIsOpen, setToggleMenu] = useState<boolean>(false);
  const { t } = useTranslation();

  const toggleMenu = useCallback(
    (): void => setToggleMenu(!menuIsOpen),
    [setToggleMenu, menuIsOpen]
  );

  const handleRemove = useCallback(() => {
    onRemove()
  }, [toggleMenu]);

  return (
    <Menu
      visible={menuIsOpen}
      onDismiss={toggleMenu}
      anchor={
        <IconButton icon="dots-vertical" size={20} onPress={toggleMenu} />
      }>
      <Menu.Item
        onPress={handleRemove}
        icon="delete"
        title={t('menu.delete')}
      />
    </Menu>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingVertical: 10
  }
});