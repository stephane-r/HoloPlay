// @flow
import * as React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import Spacer from '../../Spacer';

const PlaceholderProfil = () => (
  <Placeholder style={{ flexDirection: 'row' }}>
    <Placeholder Animation={Fade}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <PlaceholderLine width={100} />
          <Spacer height={15} />
          <PlaceholderLine width={50} />
        </View>
        <View
          style={{
            width: 100
          }}>
          <PlaceholderLine
            width={60}
            style={{ alignSelf: 'flex-end', borderRadius: 60 }}
            height={60}
          />
        </View>
      </View>
    </Placeholder>
  </Placeholder>
);

export default PlaceholderProfil;
