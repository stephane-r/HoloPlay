import React, { useState } from 'react';
import { Alert, TextBase, View } from 'react-native';
import { Button, Text, Divider, IconButton, Switch } from 'react-native-paper';
import stripTrailingSlash from '../../utils/stripTrailingSlash';
import { useTranslation } from 'react-i18next';
import Spacer from '../Spacer';
import { actions } from '../../store';
import { useSnackbar } from '../../providers/Snackbar';
import { useCallback } from 'react';
import { useAppSettings } from '../../providers/App';

interface Props {
  uri: string;
  isCustom: boolean;
  setInstance: (value: string) => void;
  instance: string;
}

const Instance: React.FC<Props> = ({
  uri,
  isCustom,
  setInstance,
  instance
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const snackbar = useSnackbar();
  const { setSettings } = useAppSettings();

  const onPress = useCallback(() => {
    setIsLoading(true);
    setInstance(uri, () => setIsLoading(false));
  }, [setIsLoading, uri, setInstance]);

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
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: instance === stripTrailingSlash(uri) ? 18 : 13,
          paddingVertical: 10
        }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text numberOfLines={1}>{stripTrailingSlash(uri)}</Text>
          {isCustom && (
            <>
              <Text style={{ paddingLeft: 6 }}>-</Text>
              <IconButton
                icon="delete"
                mode="contained"
                size={18}
                style={{ margin: 0 }}
                onPress={onRemovePress}
                loading={isLoading}
              />
            </>
          )}
        </View>
        <View>
          <Switch
            value={instance === stripTrailingSlash(uri)}
            onValueChange={() => onPress()}
          />
        </View>
      </View>
    </>
  );
};

export default Instance;
