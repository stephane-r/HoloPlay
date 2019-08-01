// @flow
import * as React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import { stylesVertical } from '../../Card/Layout';

const PlaceholderCardSearchItem = () => (
  <View style={stylesVertical.container}>
    <View style={stylesVertical.card}>
      <View
        style={{
          width: '100%',
          flexDirection: 'column'
        }}>
        <Placeholder Animation={Fade}>
          <PlaceholderLine
            width={100}
            height={100}
            style={{ borderRadius: 0, ...stylesVertical.picture }}
          />
        </Placeholder>
        <View style={stylesVertical.infos}>
          <View style={{ flex: 1 }}>
            <Placeholder Animation={Fade}>
              <PlaceholderLine width={100} />
              <PlaceholderLine width={100} />
            </Placeholder>
          </View>
          <Placeholder
            Animation={Fade}
            style={{ padding: 0, marginTop: 25 }}>
            <PlaceholderLine width={40} />
          </Placeholder>
        </View>
      </View>
    </View>
  </View>
);

export default PlaceholderCardSearchItem;
