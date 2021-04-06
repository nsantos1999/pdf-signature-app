import {useFocusEffect} from '@react-navigation/core';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {Animated} from 'react-native';

export type BouncedViewProps = {
  children: React.ReactNode;
  speed?: number;
  bounciness?: number;
};

export type BouncedViewRef = {
  startAnimation: () => void;
};

const BouncedView = forwardRef(
  (
    {children, speed = 8, bounciness = 20}: BouncedViewProps,
    ref: React.Ref<BouncedViewRef>,
  ) => {
    const bouncedViewAnimation = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => ({
      startAnimation() {
        bouncedViewAnimation.setValue(0.8);
        startAnimation();
      },
    }));

    const startAnimation = useCallback(() => {
      Animated.spring(bouncedViewAnimation, {
        toValue: 1,
        // restSpeedThreshold: 1000,
        // restDisplacementThreshold: 100,
        speed,
        bounciness,
        useNativeDriver: true,
      }).start();
    }, [bouncedViewAnimation, speed, bounciness]);

    useFocusEffect(
      useCallback(() => {
        startAnimation();
      }, [startAnimation]),
    );

    return (
      <Animated.View
        style={{
          transform: [
            {
              scale: bouncedViewAnimation,
            },
          ],
        }}>
        {children}
      </Animated.View>
    );
  },
);

export {BouncedView};
