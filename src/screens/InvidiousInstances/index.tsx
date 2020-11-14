import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import {
  Appbar,
  Subheading,
  List,
  Divider,
  Button,
  Text,
  Checkbox,
  useTheme
} from 'react-native-paper';
import useStore from '../../hooks/useStore';
import useBackup from '../../hooks/useBackup';
import DialogEditToken from '../../components/Dialog/EditToken';
import DialogEditApiInstance from '../../components/Dialog/EditApiInstance';
import DialogEditUsername from '../../components/Dialog/EditUsername';
import DialogErrorMonitoring from '../../components/Dialog/ErrorMonitoring';
import DialogLanguage from '../../components/Dialog/Language';
import { useTranslation } from 'react-i18next';
import getLanguageName from '../../utils/getLanguageName';
import { ScrollView } from 'react-native-gesture-handler';
import Spacer from '../../components/Spacer';
import useInvidiousInstances from '../../hooks/useInvidiousInstances';
import stripTrailingSlash from '../../utils/stripTrailingSlash';
import InstanceContainer from '../../containers/Instance';
import { NavigationHelpersCommon } from '@react-navigation/native';

interface Props {
  navigation: NavigationHelpersCommon;
}

const DEVICE_HEIGHT = Dimensions.get('window').height;

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const InvidiousInstanceScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const store = useStore();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const {
    instances,
    loading,
    setInvidiousInstance,
    submitLoading
  } = useInvidiousInstances();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, minHeight: DEVICE_HEIGHT }
        ]}>
        <Appbar accessibilityStates={[]}>
          <Appbar.BackAction
            accessibilityStates={[]}
            icon="archive"
            onPress={(): void => navigation.goBack()}
          />
          <Appbar.Content
            title={t('instance.title')}
            accessibilityStates={[]}
          />
        </Appbar>
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
              {instances.map(({ uri }) => (
                <InstanceContainer
                  key={uri}
                  uri={uri}
                  setInstance={setInvidiousInstance}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexDirection: 'column'
  }
});

export default InvidiousInstanceScreen;
