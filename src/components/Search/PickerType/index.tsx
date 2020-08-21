import React from 'react';
import { Picker } from '@react-native-community/picker';
import { View } from 'react-native';
import { actions } from '../../../store';
import { SearchTypeTypes } from '../../../store/Search';
import { Text, useTheme } from 'react-native-paper';

const SEARCH_TYPES = [
  {
    value: 'video',
    label: 'Video'
  },
  {
    value: 'playlist',
    label: 'Playlist'
  }
];

interface Props {
  searchType: SearchTypeTypes;
}

const SearchPickerType = ({ searchType }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={{ width: 122 }}>
      <Picker
        selectedValue={searchType}
        onValueChange={actions.setSearchType}
        style={{ color: colors.text }}>
        {SEARCH_TYPES.map(({ value, label }, index) => (
          <Picker.Item key={index} label={label} value={value} />
        ))}
      </Picker>
    </View>
  );
};

export default SearchPickerType;
