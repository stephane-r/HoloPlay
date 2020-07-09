import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import {
  Searchbar,
  Text,
  TouchableRipple,
  IconButton
} from 'react-native-paper';
import { useAnimation } from 'react-native-animation-hooks';
import { actions } from '../../../store';
import SearchSubmenu from '../Submenu';

const SEARCH_INPUT_PLACEHOLDER = 'Search music';
const SEARCH_EMPTY_VALUE = 'Add search value';

type History = string;

interface SearchProps {
  history: string[];
}

interface SearchSubmenuProps {
  isOpen: boolean;
  selectValue: Function;
  items: string[];
}

const Search: React.FC<SearchProps> = ({ history }) => {
  const [value, setValue] = useState<null | string>(null);
  const [showSubmenu, setShowSubmenu] = useState<boolean>(false);

  const searchThroughApi = (): void => {
    if (value !== '' && value !== null) {
      return actions.search(value);
    }

    return actions.setFlashMessage(SEARCH_EMPTY_VALUE);
  };

  const toggleSubmenu = (): void => setShowSubmenu(!showSubmenu);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, paddingRight: 8 }}>
        <Searchbar
          accessibilityStates={[]}
          placeholder={SEARCH_INPUT_PLACEHOLDER}
          onChangeText={setValue}
          onIconPress={searchThroughApi}
          value={value ?? ''}
        />
      </View>
      {history.length > 0 && (
        <>
          <IconButton
            accessibilityStates={[]}
            icon="history"
            color="white"
            size={30}
            onPress={toggleSubmenu}
          />
          <SearchSubmenu
            items={history}
            selectValue={(value: string): void => {
              setValue(value);
              toggleSubmenu();
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
    paddingVertical: 16,
    flexDirection: 'row'
  }
});

export default Search;
