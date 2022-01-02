import React, { Suspense } from 'react';
import { Title, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import Layout from '../../components/Layout';
import SearchResultContainer from '../../containers/Search/Result';
import Header from '../../components/Header';
import SearchbarAbsoluteContainer from '../../containers/Search/BarAbsolute';
import SearchPickerTypeContainer from '../../containers/Search/PickerType';

const SearchScreen: React.FC = ({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  return (
    <>
      <Layout>
        <Header
          title={t('navigation.search')}
          backgroundColor={colors.screens.search}>
          <SearchPickerTypeContainer />
        </Header>
        <SearchResultContainer />
      </Layout>
      <SearchbarAbsoluteContainer />
    </>
  );
};

export default SearchScreen;
