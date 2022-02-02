import React, { memo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text, Divider, IconButton } from 'react-native-paper';
import stripTrailingSlash from '../../utils/stripTrailingSlash';
import { useTranslation } from 'react-i18next';
import Spacer from '../Spacer';
import { actions } from '../../store';
// import useInvidiousInstances from '../../hooks/useInvidiousInstances';
import { InstanceContainer } from '../../containers/Instance';
import { CustomInstance } from '../../types';
import { useInvidiousInstances } from '../../containers/InstanceList';
import {Instance} from '../Instance';
import { useAppSettings } from '../../providers/App';

interface Props {
  customInstances: CustomInstance[];
}

const InstanceList: React.FC<Props> = memo(() => {
  const { t } = useTranslation();
  const {data, custom} = useInvidiousInstances()

  if (!data) {
    return (
      <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15
          }}>
          <Text>{t('instance.loading')}</Text>
        </View>
    )
  }

  return (
    <View style={styles.content}>
        <View>
          {[...custom, ...data].map(({ uri, isCustom }) => (
            <Instance
              key={uri}
              uri={stripTrailingSlash(uri)}
              isCustom={isCustom}
            />
          ))}
        </View>
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column'
  }
});

export default InstanceList;
