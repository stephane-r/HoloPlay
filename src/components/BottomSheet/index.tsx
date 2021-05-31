import React, { Component, useState, useEffect, PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native';
import PlayerContainer from '../../containers/Player';
import { Text } from 'react-native-paper';

class BottomSheet extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY()
    };

    this.createPanResponder(props);
  }

  setModalVisible(visible) {
    const {
      closeFunction,
      height,
      hasDragabbleIcon,
      backgroundColor,
      dragIconColor
    } = this.props;
    const { animatedHeight, pan } = this.state;
    if (visible) {
      this.setState({ modalVisible: visible });
      Animated.timing(animatedHeight, {
        toValue: height,
        duration: 300,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0)
        });
        if (typeof closeFunction === 'function') closeFunction();
      });
      this.props.onClose();
    }
  }

  createPanResponder(props) {
    const { height, draggable = true } = props;
    const { pan } = this.state;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (draggable && gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(
            e,
            gestureState
          );
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const gestureLimitArea = height / 3;
        const gestureDistance = gestureState.dy;
        if (draggable && gestureDistance > gestureLimitArea) {
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
        }
      }
    });
  }

  show() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  render() {
    const {
      children,
      hasDraggableIcon,
      backgroundColor,
      dragIconColor
    } = this.props;
    const { animatedHeight, pan, modalVisible } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform()
    };

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.background}
          activeOpacity={1}
          onPress={() => this.close()}
        />
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[panStyle, styles.container, { height: animatedHeight }]}>
          {children}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  background: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  container: {
    backgroundColor: '#F3F3F3',
    width: '100%',
    height: 0,
    overflow: 'hidden'
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});

export default BottomSheet;
