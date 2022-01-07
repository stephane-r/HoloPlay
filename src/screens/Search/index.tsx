import React from 'react';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/Layout';
import { SearchResultContainer } from '../../containers/Search/Result';
import Header from '../../components/Header';
import { SearchPickerTypeContainer } from '../../containers/Search/PickerType';
import { SearchProvider } from '../../providers/Search';
import { SearchbarAbsolute } from '../../components/Search/BarAbsolute';

const SearchScreen: React.FC = ({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <SearchProvider data={{ history: route.params.initialSettings.history }}>
      <Layout>
        <Header
          title={t('navigation.search')}
          backgroundColor={colors.screens.search}>
          <SearchPickerTypeContainer />
        </Header>
        <SearchResultContainer />
      </Layout>
      <SearchbarAbsolute />
    </SearchProvider>
  );
};

export default SearchScreen;
