// @flow
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { actions } from '../../store';

const SEARCH_INPUT_PLACEHOLDER = 'Search music';

const Search = () => {
  const [value, setValue] = useState(null);

  const searchThroughApi = () => {
    if (value !== '' && value !== null) {
      return actions.search(value);
    }

    return actions.setFlashMessage('Add search value');
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={SEARCH_INPUT_PLACEHOLDER}
        onChangeText={text => setValue(text)}
        onIconPress={searchThroughApi}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16
  }
});

export default Search;
