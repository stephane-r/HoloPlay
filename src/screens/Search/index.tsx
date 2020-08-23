import React, { Suspense } from 'react';
import { View } from 'react-native';
import { Title, useTheme, Text, Searchbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import Layout from '../../components/Layout';
import Spacer from '../../components/Spacer';
import SearchResultContainer from '../../containers/Search/Result';
import PlaceholderSearchList from '../../components/Placeholder/Search';
import Header from '../../components/Header';
import SearchValueContainer from '../../containers/Search/Value';
import SearchbarAbsoluteContainer from '../../containers/Search/BarAbsolute';

const SearchScreen: React.FC = ({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  return (
    <>
      <Layout setTheme={route.params.toggleTheme}>
        <Header
          title={t('navigation.search')}
          backgroundColor={colors.screens.search}>
          <SearchValueContainer />
        </Header>
        <Suspense fallback={<PlaceholderSearchList />}>
          <SearchResultContainer />
        </Suspense>
      </Layout>
      <SearchbarAbsoluteContainer />
    </>
  );
};

export default SearchScreen;
