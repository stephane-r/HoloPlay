import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';

export const APP_LANGUAGES = {
  en: 'English',
  fr: 'Français',
  cs: 'Čeština'
};

const initI18n = async () => {
  const lng = await AsyncStorage.getItem('language');

  i18n.use(initReactI18next).init({
    resources: {
      en: require('./en'),
      fr: require('./fr'),
      cs: require('./cs')
    },
    lng: lng ?? 'en'
  });
};

initI18n();
