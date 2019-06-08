/* eslint react/prop-types: 0 */
import React, { useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import PlayerContainer from '../../containers/Player';

const Audio = ({ playerIsOpened }) => {
  const bottomSheet = useRef(null);
  const snapPoints = [Dimensions.get('window').height - 24, 0];

  useEffect(() => {
    switch (true) {
      case playerIsOpened === 0:
        bottomSheet.current.snapTo(0);
        break;
      default:
        bottomSheet.current.snapTo(1);
        break;
    }
  });

  return (
    <BottomSheet
      ref={bottomSheet}
      snapPoints={snapPoints}
      renderContent={PlayerContainer}
      initialSnap={1}
    />
  );
};

export default Audio;
