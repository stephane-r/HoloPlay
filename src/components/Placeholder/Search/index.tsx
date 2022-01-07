import React, { memo } from 'react';
import { View } from 'react-native';
import { styles } from '../../CardList';
import PlaceholderCardSearchItem from '../Card';

const PlaceholderSearchList: React.FC = memo(() => (
  <View style={styles.list}>
    <PlaceholderCardSearchItem />
    <PlaceholderCardSearchItem />
    <PlaceholderCardSearchItem />
    <PlaceholderCardSearchItem />
    <PlaceholderCardSearchItem />
    <PlaceholderCardSearchItem />
  </View>
));

export default PlaceholderSearchList;
