import React from 'react';
import { Text, Title, Button } from 'react-native-paper';
import Spacer from '../../Spacer';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const SearchError: React.FC = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  return (
    <>
      <Spacer height={10} />
      <Text>{t('search.error')}</Text>
      <Spacer height={20} />
      <Button mode="contained" onPress={() => navigate('InvidiousInstances')}>
        {t('search.buttonChangeInstance')}
      </Button>
      <Spacer height={20} />
    </>
  );
};

export default SearchError;
