import React from 'react';
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type CircleProp = {
  onPress: () => void;
};

const Circle: React.FC<CircleProp> = ({onPress}): React.JSX.Element => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View>
      <View>
        <TouchableOpacity>
          <View>
            <AntDesign name="arrowright" size={30} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Circle;
