import React, { memo, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import PlayerContainer from '../../containers/Player';
import BottomSheet from '../BottomSheet';
import PlayerSmallContainer from '../../containers/PlayerSmall';
import Overlay from '../Overlay';

const AppPlayer: React.FC<Props> = () => {
  const bottomSheet = useRef(null);
  const opacity = new Animated.Value(0);

  const showPlayer = (): void => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false
    }).start();
    bottomSheet.current.show();
  };

  const onClose = (): void =>
    Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false
    }).start();

  return (
    <>
      <Overlay opacity={opacity} />
      <PlayerSmallContainer showPlayer={showPlayer} />
      <BottomSheet
        ref={bottomSheet}
        height={Dimensions.get('window').height}
        onClose={onClose}>
        <PlayerContainer closePlayer={() => bottomSheet.current.close()} />
      </BottomSheet>
    </>
  );
};

export default memo(AppPlayer);
