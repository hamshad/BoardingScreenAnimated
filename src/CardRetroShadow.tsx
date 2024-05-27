import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  LayoutRectangle,
  useWindowDimensions,
  Animated,
} from 'react-native';

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
  const translate = React.useRef(new Animated.Value(width)).current;

  useEffect(() => {}, [0]);

  const Shadow = useCallback((): React.JSX.Element => {
    const padding = CardPosition
      ? Math.hypot(CardPosition.width, CardPosition.height) / 2 - 10
      : //? CardPosition.width / 2
        0;
    return (
      <View
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
          backgroundColor: '#e76f51',
          borderRadius: 24,
        }}></View>
    );
  }, [CardPosition]);

  return (
    <View style={styles.cardContainer}>
      <View
        onResponderMove={event => {
          console.log(event.nativeEvent);
        }}
        style={[
          styles.card,
          isPortrait ? {width: '80%'} : {height: '80%'},
          {transform: [{translateX: 0}, {translateY: 0}]},
        ]}
        onLayout={event => {
          console.log(event.nativeEvent.layout);
          setCardPosition(event.nativeEvent.layout);
        }}>
        <Text style={styles.cardText}>Hello World</Text>
      </View>
      <Shadow />
    </View>
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
