import moment from 'moment';
import {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';

export const MultipleDatePicker = ({
  date,
  setDate,
  initDate = new Date(),
  minimumDate = new Date(),
  disabledDaysIndexes = [6, 7],
}) => {
  const [markedDates, setMarkedDates] = useState({});
  const [range, setRange] = useState({});

  useEffect(() => {
    getDisabledDays(
      initDate.getMonth(),
      initDate.getFullYear(),
      disabledDaysIndexes,
    );
  }, []);

  const getDisabledDays = (month, year, daysIndexes) => {
    let pivot = moment().month(month).year(year).startOf('month');
    const end = moment().month(month).year(year).endOf('month');
    let dates = {};
    const disabled = {disabled: true, disableTouchEvent: true};
    while (pivot.isBefore(end)) {
      daysIndexes.forEach(day => {
        const copy = moment(pivot);
        dates[copy.day(day).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }
    if (range.start && range.end) {
      const periodDates = generatePeriod(range.start, range.end);
      dates = {...dates, ...periodDates};
    }
    setMarkedDates(dates);
    return dates;
  };

  const handleDayPress = day => {
    const dayString = day.dateString;
    let newRange = {...range};

    if (!range.start || (range.start && range.end)) {
      newRange = {start: dayString, end: null};
    } else {
      if (moment(dayString).isBefore(moment(range.start))) {
        newRange = {start: dayString, end: range.start};
      } else {
        newRange.end = dayString;
      }
    }

    setRange(newRange);
    setDate(newRange); // If you need to set it to a higher level component
    updateMarkedDates(newRange);
  };

  const generatePeriod = (start, end) => {
    let dates = {};
    let startDate = moment(start);
    let endDate = moment(end);

    while (startDate.isBefore(endDate) || startDate.isSame(endDate)) {
      let dateString = startDate.format('YYYY-MM-DD');
      dates[dateString] = {
        color: 'blue',
        textColor: 'white',
      };
      startDate.add(1, 'day');
    }
    dates[start] = {startingDay: true, color: 'blue', textColor: 'white'};
    dates[end] = {endingDay: true, color: 'blue', textColor: 'white'};
    return dates;
  };

  const updateMarkedDates = newRange => {
    let updatedMarkedDates = {...markedDates};
    if (newRange.start && newRange.end) {
      const periodDates = generatePeriod(newRange.start, newRange.end);
      updatedMarkedDates = {...updatedMarkedDates, ...periodDates};
    } else if (newRange.start) {
      updatedMarkedDates[newRange.start] = {
        startingDay: true,
        color: 'blue',
        textColor: 'white',
      };
    }
    setMarkedDates(updatedMarkedDates);
  };

  return (
    <Calendar
      theme={{
        textSectionTitleDisabledColor: '#d9e1e8',
      }}
      markingType={'period'}
      markedDates={markedDates}
      current={initDate}
      //   minDate={minimumDate}
      onDayPress={handleDayPress}
      firstDay={1}
      enableSwipeMonths={true}
      onMonthChange={date => {
        getDisabledDays(date.month - 1, date.year, disabledDaysIndexes);
      }}
    />
  );
};
