import React, {useState} from 'react';
import {useColorScheme, View} from 'react-native';
import {DatePicker} from './DatePicker';
import {MultipleDatePicker} from './MultipleDatePicker';

type CalenderCheckProp = {
  [key: string]: any;
};

const CalenderCheck: React.FC<CalenderCheckProp> = (
  props,
): React.JSX.Element => {
  const isDark = useColorScheme() === 'dark';
  const [date, setDate] = useState<string>('2024-05-28');

  console.log(date);
  return (
    <View>
      <DatePicker date={date} setDate={setDate} />
      {/* <MultipleDatePicker date={date} setDate={setDate} /> */}
    </View>
  );
};

export default CalenderCheck;
