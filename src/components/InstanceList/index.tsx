import React, { memo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, Divider, IconButton } from 'react-native-paper';
import stripTrailingSlash from '../../utils/stripTrailingSlash';
import { useTranslation } from 'react-i18next';
import Spacer from '../Spacer';
import { actions } from '../../store';
import useInvidiousInstances from '../../hooks/useInvidiousInstances';
import { InstanceContainer } from '../../containers/Instance';
import { CustomInstance } from '../../types';

interface Props {
  customInstances: CustomInstance[];
}

const InstanceList: React.FC<Props> = memo(({ customInstances }) => {
  const { t } = useTranslation();
  const { instances, loading, setInvidiousInstance, submitLoading } =
    useInvidiousInstances();

  return (
    <View style={styles.content}>
      {loading ? (
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15
          }}>
          <Text>{t('instance.loading')}</Text>
        </View>
      ) : (
        <View>
          {[...customInstances, ...instances].map(({ uri, isCustom }) => (
            <InstanceContainer
              key={uri}
              uri={uri}
              isCustom={isCustom}
              // TODO: refactor with new provider
              setInstance={setInvidiousInstance}
            />
          ))}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column'
  }
});

export default InstanceList;
