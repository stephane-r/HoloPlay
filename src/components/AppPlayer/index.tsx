import React, { memo, useRef, useCallback, useMemo } from 'react';
import { Animated, Dimensions } from 'react-native';
import { PlayerContainer } from '../../containers/Player';
import BottomSheet from '../BottomSheet';
import { PlayerSmallContainer } from '../../containers/PlayerSmall';
import Overlay from '../Overlay';

const AppPlayer: React.FC = memo(() => {
  const bottomSheet = useRef(null);
  const opacity = new Animated.Value(0);

  const handleOpen = (): void => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false
    }).start();
    bottomSheet.current.show();
  };

  const handleClose = () =>
    Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false
    }).start();

  return (
    <>
      <Overlay opacity={opacity} />
      <PlayerSmallContainer onPress={handleOpen} />
      <BottomSheet
        ref={bottomSheet}
        height={Dimensions.get('window').height}
        onClose={handleClose}>
        <PlayerContainer onClose={() => bottomSheet.current.close()} />
      </BottomSheet>
    </>
  );
});

export default AppPlayer;
