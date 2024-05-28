/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Circle from './Circle';
import CardRetroShadow from './CardRetroShadow';
import CalenderCheck from './Calender/CalenderCheck';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const onPress = () => {};

  return (
    <SafeAreaView>
      <StatusBar hidden />
      {/* <Circle onPress={onPress} /> */}
      {/* <CardRetroShadow /> */}
      <CalenderCheck />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
