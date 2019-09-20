// @flow
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Text, TouchableRipple } from 'react-native-paper';
import { actions } from '../../store';

const SEARCH_INPUT_PLACEHOLDER = 'Search music';
const SEARCH_EMPTY_VALUE = 'Add search value';

type History = String;

type SearchProps = {
  history: Array<History>
};

type SearchSubmenuProps = {
  items: Array<History>,
  isOpen: boolean,
  selectValue: Function
};

const Search = ({ history }: SearchProps) => {
  const [value, setValue] = useState(null);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const searchThroughApi = (): Function => {
    if (value !== '' && value !== null) {
      return actions.search(value);
    }

    return actions.setFlashMessage(SEARCH_EMPTY_VALUE);
  };

  const setInputValue = (value: string): Function => {
    if (!value || value === '') {
      setShowSubmenu(false);
    }

    return setValue(value);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={SEARCH_INPUT_PLACEHOLDER}
        onChangeText={setInputValue}
        onFocus={() => (value || value === '') && setShowSubmenu(true)}
        onKeyPress={() => value !== '' && setShowSubmenu(true)}
        onBlur={() => setTimeout(() => setShowSubmenu(false), 500)}
        onIconPress={searchThroughApi}
        value={value}
      />
      <Submenu
        items={history}
        selectValue={setValue}
        isOpen={showSubmenu} />
    </View>
  );
};

const Submenu = ({ isOpen, selectValue, items }: SearchSubmenuProps) => (
  <View style={[styles.submenu, { opacity: isOpen ? 1 : 0 }]}>
    {items.map((text, index) => (
      <TouchableRipple
        key={index}
        onPress={() => selectValue(text)}>
        <View
          style={{
            borderTopColor: '#bdc3c7',
            borderTopWidth: index === 0 ? 0 : 1,
            padding: 7
          }}>
          <Text>{text}</Text>
        </View>
      </TouchableRipple>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16
  },
  submenu: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    elevation: 2,
    backgroundColor: 'white',
    zIndex: 2,
    borderRadius: 4
  }
});

export default Search;
