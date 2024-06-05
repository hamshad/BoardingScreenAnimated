import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  LayoutRectangle,
  Animated as anim1,
  useWindowDimensions,
  Easing,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  clamp,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type CardRetroShadowProp = {
  [key: string]: any;
};

const CardRetroShadow: React.FC<CardRetroShadowProp> = (
  props,
): React.JSX.Element => {
  const isDark = useColorScheme() === 'dark';
  const {width, height} = useWindowDimensions();
  const isPortrait = height > width;
  const [CardPosition, setCardPosition] = useState<LayoutRectangle>();
  const scale = useSharedValue(1);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const opacity = React.useRef(new anim1.Value(1)).current;
  const gesturePan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;

      anim1
        .timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
        .start();
    })
    .onUpdate(event => {
      const maxTranslateX = width / 2;
      const maxTranslateY = height / 2;

      scale.value = withTiming(1.1, {duration: 200});
      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX,
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY,
      );
    })
    .onFinalize(() => {
      scale.value = withTiming(1, {duration: 200});
    })
    .runOnJS(true);

  const translate = useAnimatedStyle(() => ({
    transform: [
      {translateX: translationX.value},
      {translateY: translationY.value},
      {scale: scale.value},
    ],
    elevation: interpolate(
      scale.value,
      [1, 1.1],
      [80, 120],
      Extrapolation.CLAMP,
    ),
    backgroundColor: interpolateColor(
      scale.value,
      [1, 1.1],
      ['#264653', '#2a9d8f'],
    ),
  }));

  const textOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(scale.value, [1, 1.1], [0, 1]),
  }));

  useEffect(() => {}, [0]);

  const Shadow = useCallback((): React.JSX.Element => {
    const padding = CardPosition
      ? Math.hypot(CardPosition.width, CardPosition.height) / 2 - 10
      : //? CardPosition.width / 2
        0;
    return (
      <anim1.View
        style={{
          position: 'absolute',
          //   top: CardPosition ? CardPosition.y + CardPosition.height / 4 : 0,
          //   left: CardPosition ? CardPosition.x + CardPosition.width / 4 : 0,
          zIndex: -50,
          paddingTop: padding,
          paddingLeft: padding,
          paddingRight: CardPosition
            ? isPortrait
              ? padding + CardPosition.y
              : padding + CardPosition.x
            : padding,
          paddingBottom: padding,
          transform: [
            {
              translateY: CardPosition
                ? isPortrait
                  ? CardPosition.x + CardPosition.height / 1.65
                  : CardPosition.y + CardPosition.height / 1.55
                : 0,
            },
            {
              translateX: CardPosition
                ? isPortrait
                  ? CardPosition.x + CardPosition.height / 1.65
                  : CardPosition.y + CardPosition.height / 1.55
                : 0,
            },
            {rotate: '45deg'},
          ],
          opacity: opacity,
          backgroundColor: '#e76f51',
          borderRadius: 24,
        }}></anim1.View>
    );
  }, [CardPosition]);

  return (
    <GestureDetector gesture={gesturePan}>
      <View style={styles.cardContainer}>
        <Animated.View
          onResponderMove={event => {
            console.log(event.nativeEvent);
          }}
          style={[
            styles.card,
            isPortrait ? {width: '80%'} : {height: '80%'},
            translate,
          ]}
          onLayout={event => {
            console.log(event.nativeEvent.layout);
            setCardPosition(event.nativeEvent.layout);
          }}>
          {/* <Text style={styles.cardText}>Hello World</Text> */}
          <Animated.Text
            style={[
              textOpacity,
              {
                alignSelf: 'center',
                fontSize: 220,
                textAlign: 'center',
              },
            ]}>
            🤡
          </Animated.Text>
          {/* <Animated.Image
            style={[
              textOpacity,
              {
                alignSelf: 'center',
              },
            ]}/> */}
        </Animated.View>
        <Shadow />
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4a261',
  },
  card: {
    borderRadius: 24,
    aspectRatio: 1 / 1,
    backgroundColor: '#2a9d8f',
    elevation: 80,
    // shadowColor: '#e9c46a',
  },
  cardText: {
    flex: 1,
    alignSelf: 'center',
    fontFamily: 'Danfo-Regular',
    color: '#264653',
    fontSize: 80,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default CardRetroShadow;
