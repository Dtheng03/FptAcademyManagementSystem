import React from "react";
import styles from "./Calender.module.scss"
import classNames from "classnames/bind";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

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
        <button className={cx("small-button")} onClick={prevMonth}><LeftOutlined /></button>
        <p style={{fontWeight: "600", fontSize:"16", color:"#2D3748"}}>{`${initialDate.toLocaleString("default", {
          month: "long",
        })} ${initialDate.getFullYear()}`}</p>
        <button className={cx("small-button")} onClick={nextMonth}><RightOutlined /></button>
      </div>
      <div className={cx("strange-line-calender")}></div>
      <div className={cx("calender-choose")}>
        <table className={cx("calender-container")}>
          <thead className={cx("top-calender")}>
            <tr className={cx("calender-content")}>
              {daysOfWeek.map((day) => (
                <th style={{fontWeight: "500", fontSize:"12", color:"#7E818C"}} key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className={cx("body-content")} style={{textAlign: "center"}}>
            {[...Array(Math.ceil((numDays + startingDay) / 7))].map(
              (_, weekIndex) => (
                <tr key={weekIndex} className="calender-body-content" style={{textAlign: "center"}}>
                  {[...Array(7)].map((_, dayIndex) => {
                    const dayNum = weekIndex * 7 + dayIndex - startingDay + 1;
                    const currDay = new Date(
                      initialDate.getFullYear(),
                      initialDate.getMonth(),
                      dayNum
                    );
                    return (
                      <td style={{fontWeight: "500", fontSize:"14", color:"#2D3748"}} key={dayIndex} onClick={() => handleDayClick(dayNum)}>
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
