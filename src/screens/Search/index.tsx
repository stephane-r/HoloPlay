import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

import { Header } from "../../components/Header";
import Layout from "../../components/Layout";
import { SearchbarAbsolute } from "../../components/Search/BarAbsolute";
import { SearchResult } from "../../components/Search/Result";
import { SearchPickerTypeContainer } from "../../containers/Search/PickerType";
import { SearchProvider } from "../../providers/Search";

const SearchScreen: React.FC = memo(({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <SearchProvider data={{ history: route.params.initialSettings.history }}>
      <Layout>
        <Header
          title={t("navigation.search")}
          backgroundColor={colors.screens.search}
        >
          <SearchPickerTypeContainer />
        </Header>
        <SearchResult />
      </Layout>
      <SearchbarAbsolute />
    </SearchProvider>
  );
});

export default SearchScreen;
