// @flow
/* eslint react/prop-types: 0 */
import React from 'react';
import { Dimensions, Animated, StyleSheet } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import PlayerContainer from '../../containers/Player';
import GET_USER from '../../graphql/query/user';

const WINDOW_WIDTH = Dimensions.get('window').width;
const FROM_VALUE = WINDOW_WIDTH;
const TO_VALUE = 0;

type SidebarProps = {
  playerIsOpened: boolean,
  source: Object,
  userId: number
};

const Sidebar = ({ playerIsOpened, source, userId }: SidebarProps) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { userId }
  });

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
      <PlayerContainer
        userId={userId}
        favoris={loading || !data.user ? [] : data.user.favoris}
        favorisIds={loading || !data.user ? [] : data.user.favorisIds}
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
  }
});

export default Sidebar;
