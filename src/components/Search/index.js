import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../Forms/Input';
import { actions } from '../../store';
import Button from '../Forms/Button';

const SEARCH_INPUT_PLACEHOLDER = 'Search music';

const Search = ({ isSearching }) => (
  <View style={styles.container}>
    <View style={{ flex: 1, paddingRight: 16 }}>
      <Input
        onChangeText={text => actions.setSearchValue(text)}
        placeholder={SEARCH_INPUT_PLACEHOLDER}
        spacer={0}
      />
    </View>
    <Button
      icon="Search"
      onPress={actions.search}
      isLoading={isSearching} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default Search;
