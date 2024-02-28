import React, { useState, useRef } from "react"; // Import React
import styles from "./Calender.module.scss";
import classNames from "classnames/bind";
import { DatePicker } from "antd";
import { TrainingCalendarIcon } from "../../../Components/Common/Icons/NavMenuIcons/index";
import { DropDownCircleIcon } from "../../../Components/Common/Icons/ActionIcons/index";
import { ReportIcon } from "../../../Components/Common/Icons/IndicatorIcons/index";

const cx = classNames.bind(styles);

function Calender() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const dropdownButtonRef = useRef(null);

  const onChangeStartDate = date => {
    setStartDate(date);
    setEndDate(null);
    setPopupOpen(false);
  };

  const onChangeEndDate = date => {
    // Check if date is null
    if (!date) {
      setEndDate(null);
      return;
    }

    // Check if the selected end date is the same as the start date
    if (startDate && date.isSame(startDate, 'day')) {
      // toast.warning('End date cannot be the same as start date.');
      setEndDate(null); // Reset end date
    } else {
      setEndDate(date);
    }
  };

  // Function to disable end dates before the selected start date
  const disabledEndDate = endValue => {
    if (!startDate || !endValue) {
      return false;
    }
    return endValue.isBefore(startDate.startOf('day'));
  };

  const handlePopupToggle = () => {
    setClickCount(prevCount => prevCount + 1); // Increment the click count
    setPopupOpen(prevPopupOpen => !prevPopupOpen); // Toggle popup open/close
  };

  return (
    <div className={cx('calender')}>
      <div className={cx('dropdown')}>
        <button
          ref={dropdownButtonRef}
          className={cx('dropdown-button', { 'custom-datepicker-popup-open': clickCount % 2 === 1 })}
          onClick={handlePopupToggle}
        >
          <div className={cx('conner-left')}>
            <TrainingCalendarIcon />
            <p>Time frame</p>
            <p>start date</p>
            <DatePicker
              onChange={onChangeStartDate}
              placeholder="--/--/----"
              style={{ width: '103px' }}
              inputStyle={{ width: '100%', height: '27px' }}
              popupStyle={{
                width: '946px',
                height: '560px',
                position: 'absolute',
                left: '42.8%',
                visibility: popupOpen ? 'visible' : 'hidden',
              }}
              getCalendarContainer={() => dropdownButtonRef.current}
            />
            {startDate ? (
              <>
                <p>end date</p>
                <DatePicker
                  onChange={onChangeEndDate}
                  disabledDate={disabledEndDate}
                  placeholder="--/--/----"
                  style={{ width: '103px' }}
                  inputStyle={{ width: '100%', height: '27px' }}
                  popupStyle={{
                    width: '746px',
                    height: '318px',
                    position: 'absolute',
                    left: '36.8%',
                    visibility: popupOpen ? 'visible' : 'hidden',
                  }}
                  getCalendarContainer={() => dropdownButtonRef.current}
                />
              </>
            ) : (
              <ReportIcon />
            )}
          </div>
          <div className={cx('conner-right')}>
            <DropDownCircleIcon />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Calender;