// @flow
import React from 'react';
import { Dimensions, Animated, StyleSheet, BackHandler } from 'react-native';
import PlayerContainer from '../../containers/Player';
import { actions } from '../../store';

type SidebarProps = {
  playerIsOpened: boolean,
  from: string,
  to: string
};

const Sidebar = ({ playerIsOpened, from, to }) => {
  const animatedValue = new Animated.Value(from);

  Animated.timing(animatedValue, {
    useNativeDriver: true,
    toValue: to,
    duration: 200
  }).start();

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (playerIsOpened) {
      actions.hidePlayer();
    }

    return false;
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: animatedValue }] }
      ]}>
      <PlayerContainer />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height,
    zIndex: 2,
    backgroundColor: 'white'
  }
});

export default React.memo<SidebarProps>(Sidebar);
