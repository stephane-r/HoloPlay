import React, { memo } from 'react';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { SearchPickerTypeContainer } from '../../containers/Search/PickerType';
import { SearchProvider } from '../../providers/Search';
import { SearchbarAbsolute } from '../../components/Search/BarAbsolute';
import { SearchResult } from '../../components/Search/Result';

const SearchScreen: React.FC = memo(({ route }) => {
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
        <SearchResult />
      </Layout>
      <SearchbarAbsolute />
    </SearchProvider>
  );
});

export default SearchScreen;
