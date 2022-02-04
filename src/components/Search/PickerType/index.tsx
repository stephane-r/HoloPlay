import React, { memo } from 'react';
import { Picker } from '@react-native-community/picker';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

const SEARCH_TYPES = ['video', 'playlist'];

const SearchPickerType = memo(({ searchType, onValueChange }) => {
  const { t } = useTranslation();

  return (
    <View style={{ width: 122 }}>
      <Picker
        style={{ color: 'white', height: 30 }}
        selectedValue={searchType}
        onValueChange={onValueChange}>
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
});

export default SearchPickerType;
