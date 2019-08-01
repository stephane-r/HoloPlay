// @flow
import * as React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import { stylesHorizontal } from '../../Card/Layout';
import Spacer from '../../Spacer';

const PlaceholderCardSearchItem = () => (
  <View style={{ ...stylesHorizontal.container, paddingTop: 20 }}>
    <View style={stylesHorizontal.card}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row'
        }}>
        <Placeholder Animation={Fade}>
          <View style={{ flexDirection: 'row' }}>
            <PlaceholderLine style={stylesHorizontal.picture} />
            <View style={{ flex: 1, margin: 20 }}>
              <PlaceholderLine width={100} />
              <Spacer height={20} />
              <PlaceholderLine width={50} />
            </View>
          </View>
        </Placeholder>
      </View>
    </View>
  </View>
);

export default PlaceholderCardSearchItem;
