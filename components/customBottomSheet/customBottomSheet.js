/* eslint-disable react-hooks/exhaustive-deps */
import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useCallback, useImperativeHandle} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const BottomSheet = React.forwardRef(
  ({children, closeTranslateYBottomSheet, setСurrentHeight}, ref) => {
    // VARIABLES
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const context = useSharedValue({y: 0});
    const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;

    // FUNCTIONS
    const scrollTo = useCallback(destination => {
      'worklet';
      active.value = destination !== 0;
      translateY.value = withSpring(destination, {damping: 50});
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({scrollTo, isActive}), [
      scrollTo,
      isActive,
    ]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        setСurrentHeight &&
          setСurrentHeight(
            translateY.value < -SCREEN_HEIGHT / 1.5
              ? MAX_TRANSLATE_Y
              : translateY.value,
          );
        const closeTranslateY = closeTranslateYBottomSheet
          ? translateY.value > closeTranslateYBottomSheet
          : translateY.value > -SCREEN_HEIGHT / 3;
        if (closeTranslateY) {
          scrollTo(0);
          setСurrentHeight && setСurrentHeight(closeTranslateYBottomSheet);
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP,
      );

      return {
        borderRadius,
        transform: [{translateY: translateY.value}],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  },
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    zIndex: 100,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;
