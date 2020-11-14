import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableHighlight, Linking } from 'react-native';
import {
  Appbar,
  Subheading,
  Divider,
  Text,
  useTheme
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import Spacer from '../../components/Spacer';
import { NavigationHelpersCommon } from '@react-navigation/native';

interface Props {
  navigation: NavigationHelpersCommon;
}

const DEVICE_HEIGHT = Dimensions.get('window').height;

const PrivacyPolicyScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
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
            title={t('privacyPolicy.title')}
            accessibilityStates={[]}
          />
        </Appbar>
        <View style={styles.content}>
          <Spacer height={16} />
          <Text>{t('privacyPolicy.intro1')} <Text style={{ fontStyle: 'italic' }}>HoloPlay</Text> {t('privacyPolicy.intro2')} <Text style={{ fontWeight: 'bold' }}>Stéphane Richin</Text></Text>
          <Subheading style={styles.subheading}>
          {t('privacyPolicy.dataTitle')}
          </Subheading>
          <Text>{t('privacyPolicy.dataText')}</Text>
        </View>
        <View style={styles.content}>
          <Subheading style={styles.subheading}>
          {t('privacyPolicy.emailTitle')}
          </Subheading>
          <Text>{t('privacyPolicy.emailText1')}, {t('privacyPolicy.emailText2')}</Text>
          <Spacer height={5} />
          <TouchableHighlight onPress={() => Linking.openURL('mailto:contact@stephane-richin.fr')}><Text style={{ color: colors.primary }}>contact@stephane-richin.fr</Text></TouchableHighlight>
        </View>
        <View style={styles.content}>
          <Subheading style={styles.subheading}>{t('privacyPolicy.crashReportingTitle')}</Subheading>
          <Text>{t('privacyPolicy.crashReportingText1')}</Text>
          <Spacer height={10} />
          <Text>{t('privacyPolicy.crashReportingText2')}</Text>
        </View>
        <View style={styles.content}>
          <Subheading style={styles.subheading}>{t('privacyPolicy.permissionsTitle')}</Subheading>
          <Text>{t('privacyPolicy.permissionsText1')}</Text>
          <Spacer height={10} />
          <Text>{t('privacyPolicy.permissionsText2')}</Text>
        </View>
        <Spacer height={20} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexDirection: 'column',
    paddingHorizontal: 20
  },
  subheading: {
    fontWeight: 'bold',
    paddingTop: 16,
    paddingBottom: 8
  }
});

export default PrivacyPolicyScreen;
