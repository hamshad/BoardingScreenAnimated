import moment from 'moment';
import {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';

export const DatePicker = ({
  date,
  setDate,
  initDate = new Date(),
  minimumDate = new Date(),
  disabledDaysIndexes = [6, 7],
}) => {
  const [markedDates, setMarkedDates] = useState({});

  // And don't forget to disabled the "first" dates on init :
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
    setMarkedDates(dates);
    return dates;
  };

  return (
    <Calendar
      theme={{
        textSectionTitleDisabledColor: '#d9e1e8',
      }}
      markedDates={markedDates}
      current={initDate}
      markingType="period"
      // minDate={minimumDate.toDateString()}
      onDayPress={day => {
        setDate(day.dateString);
      }}
      firstDay={1}
      enableSwipeMonths={true}
      disabledDaysIndexes={disabledDaysIndexes}
      onMonthChange={date => {
        getDisabledDays(date.month - 1, date.year, disabledDaysIndexes);
      }}
    />
  );
};
