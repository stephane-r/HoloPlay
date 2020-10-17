import React from 'react';
import { Text, Title, Button } from 'react-native-paper';
import Spacer from '../../Spacer';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

interface Props {
  value: string;
}

const SearchEmpty: React.FC<Props> = ({ value }) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  return (
    <>
      <Spacer height={10} />
      <Text>
        {t('search.empty')} <Text style={{ fontWeight: 'bold' }}>{value}</Text>.
      </Text>
    </>
  );
};

export default SearchEmpty;
