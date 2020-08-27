import React from 'react';
import { Picker } from '@react-native-community/picker';
import { View } from 'react-native';
import { actions } from '../../../store';
import { SearchTypeTypes } from '../../../store/Search';
import { Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const SEARCH_TYPES = ['video', 'playlist'];

interface Props {
  searchType: SearchTypeTypes;
}

const SearchPickerType = ({ searchType }: Props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{ width: 122 }}>
      <Picker
        style={{ color: colors.text, height: 30 }}
        selectedValue={searchType}
        onValueChange={actions.setSearchType}>
        {SEARCH_TYPES.map((value, index) => (
          <Picker.Item
            key={index}
            label={t(`search.type.${value}`)}
            value={value}
          />
        ))}
      </Picker>
    </View>
  );
};

export default SearchPickerType;
