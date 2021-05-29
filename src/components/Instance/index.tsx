import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Text, Divider, IconButton } from 'react-native-paper';
import stripTrailingSlash from '../../utils/stripTrailingSlash';
import { useTranslation } from 'react-i18next';
import Spacer from '../Spacer';
import { actions } from '../../store';

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

  const onPress = () => {
    setIsLoading(true);
    return setInstance(uri, () => setIsLoading(false));
  };

  const onRemovePress = () => {
    actions.removeCustomInstance(uri);

    return setTimeout(
      () =>
        actions.setFlashMessage({
          message: t('flashMessage.removeCustomInstanceSuccess')
        }),
      500
    );
  };

  return (
    <>
      <Divider accessibilityStates={[]} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 10
        }}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1}>{stripTrailingSlash(uri)}</Text>
        </View>
        {instance === stripTrailingSlash(uri) ? (
          <IconButton
            icon="check"
            accessibilityStates={[]}
            size={20}
            onPress={() => null}
            animated
            style={{ height: 25, width: 50, marginRight: -15 }}
          />
        ) : (
          <Button mode="contained" onPress={onPress} loading={isLoading}>
            {t('instance.use')}
          </Button>
        )}
        {isCustom && (
          <>
            <Spacer width={10} />
            <IconButton
              icon="delete"
              mode="contained"
              size={20}
              onPress={onRemovePress}
              loading={isLoading}
            />
          </>
        )}
      </View>
    </>
  );
};

export default Instance;
