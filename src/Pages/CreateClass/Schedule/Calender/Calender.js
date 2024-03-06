import React from "react";
import styles from "./Calender.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ initialDate, onChangeMonth, onSelectDate }) => {
  const firstDayOfMonth = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth() + 1,
    0
  );
  const startingDay = firstDayOfMonth.getDay();
  const numDays = lastDayOfMonth.getDate();

  const prevMonth = () => {
    onChangeMonth(-1);
  };

  const nextMonth = () => {
    onChangeMonth(1);
  };

  const handleDayClick = (dayNum) => {
    onSelectDate(
      new Date(initialDate.getFullYear(), initialDate.getMonth(), dayNum)
    );
  };

  return (
    <div className={cx("calender")}>
      <div className={cx("button-display")}>
        <button className={cx("small-button")} onClick={prevMonth}>{"<"}</button>
        <p>{`${initialDate.toLocaleString("default", {
          month: "long",
        })} ${initialDate.getFullYear()}`}</p>
        <button className={cx("small-button")} onClick={nextMonth}>{">"}</button>
      </div>
      <div className={cx("strange-line-calender")}></div>
      <div className={cx("calender-choose")}>
        <table className={cx("calender-container")}>
          <thead className={cx("top-calender")}>
            <tr className={cx("calender-content")}>
              {daysOfWeek.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className={cx("body-content")}>
            {[...Array(Math.ceil((numDays + startingDay) / 7))].map(
              (_, weekIndex) => (
                <tr key={weekIndex} className="calender-body-content">
                  {[...Array(7)].map((_, dayIndex) => {
                    const dayNum = weekIndex * 7 + dayIndex - startingDay + 1;
                    const currDay = new Date(
                      initialDate.getFullYear(),
                      initialDate.getMonth(),
                      dayNum
                    );
                    return (
                      <td key={dayIndex} onClick={() => handleDayClick(dayNum)}>
                        {dayNum > 0 && dayNum <= numDays ? (
                          <div>
                            {dayNum}
                            {/* You can add additional logic here to display events or any other information */}
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
