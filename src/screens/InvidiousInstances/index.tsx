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
import DialogAddCustomInstance from '../../components/Dialog/AddCustomInstance';
import InstanceListContainer from '../../containers/InstanceList';

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
  const { colors } = useTheme();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <ScrollView>
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
            <Appbar.Action icon="plus" onPress={() => setDialogIsOpen(true)} />
          </Appbar>
          <InstanceListContainer />
        </View>
      </ScrollView>
      <DialogAddCustomInstance
        visible={dialogIsOpen}
        onDismiss={() => setDialogIsOpen(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default InvidiousInstanceScreen;
