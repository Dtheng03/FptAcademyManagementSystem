import React, { useState, useRef, useEffect } from "react";
import { notification } from "antd";
import styles from "./Schedule.module.scss";
import classNames from "classnames/bind";
import { TrainingCalendarIcon } from "../../../Components/Common/Icons/NavMenuIcons/index";
import { DropDownCircleIcon } from "../../../Components/Common/Icons/ActionIcons/index";
import { ReportIcon } from "../../../Components/Common/Icons/IndicatorIcons/index";
import Calendar from "./Calender/Calender";

const cx = classNames.bind(styles);

function Schedule() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateSelected, setDateSelected] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      if (dateSelected !== null) {
        setPopupOpen(false);
      }
    }
  };

  const handleChangeMonth = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    );
    setCurrentDate(newDate);
  };

  const handleChangeYear = (direction) => {
    const newYear = currentDate.getFullYear() + direction;
    if (newYear >= 1970 && newYear <= 3000) {
      const newDate = new Date(newYear, currentDate.getMonth(), 1);
      setCurrentDate(newDate);
    }
  };

  const handleSelectDate = (date) => {
    if (dateSelected === "start") {
      if (!endDate || date < new Date(endDate)) {
        setStartDate(date.toDateString());
      } else {
        notification.warning({
          message: "Invalid Date Range",
          description: "Start date cannot be after end date",
        });
      }
    } else if (dateSelected === "end") {
      if (startDate && date.toDateString() === startDate) {
        notification.warning({
          message: "Duplicate Date",
          description: "End date cannot be the same as the start date",
        });
      } else if (!startDate || date > new Date(startDate)) {
        setEndDate(date.toDateString());
      } else {
        notification.warning({
          message: "Invalid Date Range",
          description: "End date cannot be before start date",
        });
      }
    }
  };

  const handleDateDisplayClick = (selectedDate) => {
    if (selectedDate === "start") {
      setStartDate(""); // Reset start date
      setEndDate(""); // Reset end date
    }
    setDateSelected(selectedDate);
    setPopupOpen((prevState) => !prevState); // Toggle dropdown open/close
  };

  return (
    <div className={cx("calender")}>
      <div className={cx("dropdown")} ref={dropdownRef}>
        <button
          className={cx("dropdown-button", { clicked: popupOpen })}
          onClick={() => setPopupOpen((prevState) => !prevState)} // Toggle dropdown open/close
        >
          <div className={cx("conner-left")}>
            <TrainingCalendarIcon />
            <p>Time frame</p>
            {!startDate ? (
              <p
                onClick={() => handleDateDisplayClick("start")}
                className={cx("input-calender-value")}
              >
                --/--/----
                <TrainingCalendarIcon />
              </p>
            ) : (
              <>
                <p onClick={() => handleDateDisplayClick("start")}>
                  Start date: {startDate}
                </p>
              </>
            )}
            {startDate ? (
              <>
                {!endDate ? (
                  <p
                    onClick={() => handleDateDisplayClick("end")}
                    className={cx("input-calender-value")}
                  >
                    --/--/----
                    <TrainingCalendarIcon />
                  </p>
                ) : (
                  <>
                    <p onClick={() => handleDateDisplayClick("end")}>
                      End date: {endDate}
                    </p>
                  </>
                )}
              </>
            ) : (
              <div style={{ color: "red" }}>
                <ReportIcon />
              </div>
            )}
          </div>
          <div className={cx("conner-right", { spin: !popupOpen })}>
            <DropDownCircleIcon />
          </div>
        </button>
        {popupOpen && (
          <div className={cx("dropdown-content", { opened: popupOpen })}>
            <div className={cx("dropdown-option1")}>
              <div className={cx("calender-view")}>
                <Calendar
                  initialDate={currentDate}
                  onChangeMonth={handleChangeMonth}
                  onChangeYear={handleChangeYear}
                  onSelectDate={handleSelectDate}
                  disableDateSelection={dateSelected === "end"}
                />
                <Calendar
                  initialDate={
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1,
                      1
                    )
                  }
                  onChangeMonth={handleChangeMonth}
                  onChangeYear={handleChangeYear}
                  onSelectDate={handleSelectDate}
                  disableDateSelection={dateSelected === "start"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;
