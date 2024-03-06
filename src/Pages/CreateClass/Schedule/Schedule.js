import React, { useState } from "react";
import styles from "./Schedule.module.scss";
import classNames from "classnames/bind";
import { TrainingCalendarIcon } from "../../../Components/Common/Icons/NavMenuIcons/index";
import { DropDownCircleIcon } from "../../../Components/Common/Icons/ActionIcons/index";
import { ReportIcon } from "../../../Components/Common/Icons/IndicatorIcons/index";
import Calendar from "./Calender/Calender";

const cx = classNames.bind(styles);

function Calender() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date()); // Initial date for both calendars
  const [startDate, setStartDate] = useState(""); // State to store the selected start date
  const [endDate, setEndDate] = useState(""); // State to store the selected end date
  const [dateSelected, setDateSelected] = useState(null); // State to track which date (start or end) is selected

  // Function to handle month change
  const handleChangeMonth = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    );
    setCurrentDate(newDate);
  };

  // Function to handle year change
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
      }
    } else if (dateSelected === "end") {
      if (!startDate || date > new Date(startDate)) {
        setEndDate(date.toDateString());
      }
    }
  };

  // Function to handle click on the date display paragraph
  const handleDateDisplayClick = (selectedDate) => {
    setDateSelected(selectedDate);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked); // Toggle button clicked state
    setPopupOpen(!popupOpen); // Toggle popup open/close
  };

  return (
    <div className={cx("calender")}>
      <div className={cx("dropdown")}>
        <button
          className={cx("dropdown-button", { clicked: isButtonClicked })}
          onClick={handleButtonClick}
        >
          <div className={cx("conner-left")}>
            <TrainingCalendarIcon />
            <p>Time frame</p>
            <p onClick={() => handleDateDisplayClick("start")}>
              Start date: {startDate}
            </p>
            {startDate ? (
              <>
                <p onClick={() => handleDateDisplayClick("end")}>
                  End date: {endDate}
                </p>
              </>
            ) : (
              <div style={{ color: "red" }}>
                <ReportIcon />
              </div>
            )}
          </div>
          <div className={cx("conner-right")}>
            <DropDownCircleIcon />
          </div>
        </button>
        {isButtonClicked && (
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
                  {/* Render the second calendar with initialDate incremented by one month */}
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

export default Calender;
