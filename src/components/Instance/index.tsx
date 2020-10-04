import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, Divider, IconButton } from 'react-native-paper';
import stripTrailingSlash from '../../utils/stripTrailingSlash';
import { useTranslation } from 'react-i18next';

interface Props {
  uri: string;
  setInstance: (value: string) => void;
  instance: string;
}

const Instance: React.FC<Props> = ({ uri, setInstance, instance }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const onPress = () => {
    setIsLoading(true);
    return setInstance(uri, () => setIsLoading(false));
  };

  return (
    <>
      <Divider accessibilityStates={[]} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 20,
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
            style={{ height: 25, width: 50 }}
          />
        ) : (
          <Button onPress={onPress} loading={isLoading}>
            {t('instance.use')}
          </Button>
        )}
        <Button onPress={() => alert('TODO')}>{t('instance.test')}</Button>
      </View>
    </>
  );
};

export default Instance;
