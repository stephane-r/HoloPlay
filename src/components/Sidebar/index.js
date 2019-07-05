// @flow
/* eslint react/prop-types: 0 */
import React from 'react';
import { Dimensions, Animated, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import PlayerContainer from '../../containers/Player';

const WINDOW_WIDTH = Dimensions.get('window').width;
const FROM_VALUE = WINDOW_WIDTH;
const TO_VALUE = 0;

type SidebarProps = {
  playerIsOpened: boolean,
  source: Object
};

const Sidebar = ({ playerIsOpened, source }: SidebarProps) => {
  const from = !source ? FROM_VALUE : playerIsOpened ? FROM_VALUE : TO_VALUE;
  const to = playerIsOpened ? TO_VALUE : FROM_VALUE;

  const animatedValue = new Animated.Value(from);

  Animated.timing(animatedValue, {
    useNativeDriver: true,
    toValue: to,
    duration: 200
  }).start();

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: animatedValue }] }
      ]}>
      <PlayerContainer />
      <IconButton
        icon="add-a-photo"
        style={styles.button}
        size={20}
        onPress={() => alert('Pressed')}
      />
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
  },
  button: {
    position: 'absolute',
    bottom: 100,
    left: -50,
    backgroundColor: 'red',
    margin: 0
  }
});

export default Sidebar;
