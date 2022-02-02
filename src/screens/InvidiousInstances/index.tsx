import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  Appbar,
  useTheme
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { DialogAddCustomInstance } from '../../components/Dialog/AddCustomInstance';
import InstanceListContainer from '../../containers/InstanceList';
import { useTranslation } from 'react-i18next';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const InvidiousInstanceScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ScrollView>
        <View
          style={[
            styles.container,
            { backgroundColor: colors.background, minHeight: DEVICE_HEIGHT }
          ]}>
          <Appbar>
            <Appbar.BackAction
              icon="archive"
              onPress={(): void => navigation.goBack()}
            />
            <Appbar.Content
              title={t('instance.title')}
            />
            <Appbar.Action icon="plus" onPress={() => setVisible(true)} />
          </Appbar>
          <InstanceListContainer />
        </View>
      </ScrollView>
      <DialogAddCustomInstance
        visible={visible}
        onDismiss={() => setVisible(false)}
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
