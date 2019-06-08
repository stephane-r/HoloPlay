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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: '#6f6f76'
//   },
//   commandButton: {
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#292929',
//     alignItems: 'center',
//     margin: 7
//   },
//   panel: {
//     height: Dimensions.get('window').height,
//     backgroundColor: '#2c2c2fAA'
//   },
//   panelButton: {
//     padding: 13,
//     borderRadius: 10,
//     backgroundColor: '#292929',
//     alignItems: 'center',
//     marginVertical: 7
//   },
//   panelButtonTitle: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: 'white'
//   }
// });

export default Audio;
