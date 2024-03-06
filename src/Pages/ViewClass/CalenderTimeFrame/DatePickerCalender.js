import React, { useState } from "react";
import classNames from 'classnames/bind';
import styles from './CalenderTimeFrame.module.scss';

import { daysOfWeek, getDaysInMonth } from "./DateUtils";


const cx = classNames.bind(styles);
const DateInput = ({ value }) => {
  const displayText = !value
    ? "--/--/----"
    : `${String(value.getDate()).padStart(2, "0")}/${String(
        value.getMonth() + 1
      ).padStart(2, "0")}/${value.getFullYear()}`;
  return (
    <div className={cx("date-input-container")}>
      <div className={cx("date-input-text")}>{displayText}</div>
      <div>{/* <CalendarOutlined /> */}</div>
    </div>
  );
};

const DatePickerModal = () => {
  const currentDate = new Date();
  const [displayingMonth, setDisplayingMonth] = useState(
    currentDate.getMonth() + 1
  );
  const [displayingYear, setDisplayingYear] = useState(
    currentDate.getFullYear()
  );
  const handlePrevClick = () => {
    setDisplayingMonth((prev) => {
      if (prev === 1) {
        setDisplayingYear(displayingYear - 1);
        return 12;
      }
      return prev - 1;
    });
  };
  const handleNextClick = () => {
    setDisplayingMonth((prev) => {
      if (prev === 12) {
        setDisplayingYear(displayingYear + 1);
        return 1;
      }
      return prev + 1;
    });
  };
  const prevDayElements = [];
  const firstDateOfMonth = new Date(displayingYear, displayingMonth - 1, 1);
  for (let i = 0; i < firstDateOfMonth.getDay(); i++) {
    prevDayElements.push(
      <div
        key={`prev-month-calendar-${displayingMonth}/${displayingYear}/${i}`}
      ></div>
    );
  }

  return (
    <div className={cx("date-picker-modal-container")}>
      <div className={cx("date-picker-modal-content")}>
        {daysOfWeek.map((dayOfWeek) => (
          <div
            className={cx("date-picker-day-of-week")}
            key={`${displayingMonth}-day-of-week-${dayOfWeek}`}
          >
            {dayOfWeek}
          </div>
        ))}
        {prevDayElements}
        {getDaysInMonth(displayingYear, displayingMonth).map((day) => (
          <div
            className={cx("date-picker-day")}
            key={`date-picker-day-${displayingYear}-${displayingMonth}-${day}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

const DatePickerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 0, 11));
  return (
    <React.Fragment>
      <div className={cx("date-picker-calendar-container")}>
        <DateInput value={selectedDate} />
      </div>
      <div>
        <DatePickerModal />
      </div>
    </React.Fragment>
  );
};

export default DatePickerCalendar;
