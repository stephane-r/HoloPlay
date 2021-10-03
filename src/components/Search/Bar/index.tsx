import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import {
  Searchbar,
  Text,
  TouchableRipple,
  IconButton,
  useTheme
} from 'react-native-paper';
import { useAnimation } from 'react-native-animation-hooks';
import { actions } from '../../../store';
import SearchSubmenu from '../Submenu';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const SEARCH_INPUT_PLACEHOLDER = 'Search music';

type History = string;

interface SearchProps {
  history: string[];
  showButtonHistory: boolean;
  submenuPosition: 'top' | 'bottom';
}

const Search: React.FC<SearchProps> = ({
  searchValue,
  history,
  showButtonHistory = false,
  submenuPosition = 'top'
}) => {
  const [value, setValue] = useState<string>(searchValue);
  const [showSubmenu, setShowSubmenu] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { dark, colors } = useTheme();

  const searchThroughApi = async (
    selectedValue?: null | string = null
  ): void => {
    if (typeof selectedValue !== 'string' && value === '') {
      return actions.setSnackbar({
        message: t('search.emptyValue')
      });
    }

    const wantedValue =
      typeof selectedValue === 'string' ? selectedValue : value;
    await actions.search(wantedValue);
    setTimeout(() => navigation.navigate(t('navigation.search')), 200);
  };

  const toggleSubmenu = (): void => setShowSubmenu(!showSubmenu);

  const isBottomPosition = submenuPosition === 'bottom';

  useEffect(() => {
    if (searchValue) {
      setValue(searchValue);
    }
  }, [history]);

  return (
    <View
      style={[
        styles.container,
        { paddingVertical: submenuPosition === 'top' ? 16 : 0 }
      ]}>
      <View style={{ flex: 1, paddingRight: 8 }}>
        <Searchbar
          accessibilityStates={[]}
          placeholder={t('searchBar.placeholder')}
          onChangeText={setValue}
          onIconPress={searchThroughApi}
          onSubmitEditing={searchThroughApi}
          value={value ?? ''}
        />
      </View>
      {showButtonHistory && history.length > 0 && (
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
              color={
                isBottomPosition && !dark
                  ? colors.screens.search
                  : isBottomPosition && dark
                  ? 'black'
                  : 'white'
              }
              size={30}
              onPress={toggleSubmenu}
              style={
                isBottomPosition
                  ? {
                      backgroundColor: 'white',
                      elevation: 4
                    }
                  : {}
              }
            />
          </View>
          <SearchSubmenu
            position={submenuPosition}
            items={history}
            selectValue={(selectedValue: string): void => {
              toggleSubmenu();
              searchThroughApi(selectedValue);
            }}
            isOpen={showSubmenu}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
});

export default Search;
