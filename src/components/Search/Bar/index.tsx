import React, { useState, useEffect, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Searchbar,
  Text,
  TouchableRipple,
  IconButton,
  useTheme
} from 'react-native-paper';
import SearchSubmenu from '../Submenu';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSnackbar } from '../../../providers/Snackbar';
import { useSearch } from '../../../providers/Search';
import { useCallback } from 'react';

const SEARCH_INPUT_PLACEHOLDER = 'Search music';

interface SearchProps {
  searchValue: string;
  history: string[];
}

export const SearchBar: React.FC<SearchProps> = memo(
  ({ searchValue, history }) => {
    const [value, setValue] = useState(searchValue);
    const { t } = useTranslation();
    const snackbar = useSnackbar();
    const { search } = useSearch();

    const searchThroughApi = useCallback(
      (selectedValue: string): void => {
        if (!selectedValue && value === '') {
          return snackbar.show(t('search.emptyValue'));
        }

        search.search(selectedValue ?? value);
      },
      [snackbar, search, value, t]
    );

    const onSelectItem = useCallback(
      (selectedValue: string): void => {
        setValue(selectedValue);
        searchThroughApi(selectedValue);
      },
      [searchThroughApi, setValue]
    );

    return (
      <View style={[styles.container, { paddingVertical: 8 }]}>
        <View style={{ flex: 1, paddingRight: 0 }}>
          <Searchbar
            placeholder={t('searchBar.placeholder')}
            onChangeText={setValue}
            onIconPress={() => searchThroughApi()}
            onSubmitEditing={() => searchThroughApi()}
            value={value ?? ''}
          />
        </View>
        <Submenu searchThroughApi={onSelectItem} />
      </View>
    );
  }
);

const Submenu = memo(({ searchThroughApi }) => {
  const { state } = useSearch();
  const { dark, colors } = useTheme();
  const [visible, setVisible] = useState(false);

  const toggleSubmenu = useCallback(
    (): void => setVisible(!visible),
    [visible, setVisible]
  );

  if (!state.history.length) return null;

  return (
    <>
      <View
        style={{
          transform: [
            {
              translateY: -4
            }
          ]
        }}>
        <IconButton
          accessibilityStates={[]}
          icon="history"
          color={!dark ? colors.screens.search : dark ? 'black' : 'white'}
          size={30}
          onPress={toggleSubmenu}
          style={{ backgroundColor: 'white', elevation: 4 }}
        />
      </View>
      <SearchSubmenu
        position="bottom"
        items={state.history}
        selectValue={(selectedValue: string): void => {
          toggleSubmenu();
          searchThroughApi(selectedValue);
        }}
        isOpen={visible}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
});
