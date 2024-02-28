import React, { useState } from "react"; // Import React
import styles from "./General.module.scss";
import classNames from "classnames/bind";
import { TimePicker } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TrainingCalendarIcon } from "../../../Components/Common/Icons/NavMenuIcons/index";
import { DropDownCircleIcon } from "../../../Components/Common/Icons/ActionIcons/index";
import {
  AlarmIcon,
  HomeworkIcon,
} from "../../../Components/Common/Icons/OtherIcons/index";
import { LectureIcon } from "../../../Components/Common/Icons/DeliveryTypesIcons/index";
import {
  GradeIcon,
  SupplierIcon,
} from "../../../Components/Common/Icons/IndicatorIcons/index";

const cx = classNames.bind(styles);

function General() {
  const format = "HH:mm";
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setPopupOpen(prevPopupOpen => !prevPopupOpen); // Toggle popup open/close
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    // Check for duplicated times
    if (endTime && time) {
      const endTimeString = endTime.format(format);
      if (time.format(format) === endTimeString) {
        toast.warning("End time cannot be the same as start time.");
        setEndTime(null);
      }
    }
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    // Check for duplicated times
    if (startTime && time) {
      const startTimeString = startTime.format(format);
      if (time.format(format) === startTimeString) {
        toast.warning("End time cannot be the same as start time.");
        setStartTime(null);
      }
    }
  };

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked); // Toggle button clicked state
    setPopupOpen(!popupOpen); // Toggle popup open/close
  };

  // Function to disable times that are before the selected start time or after the end of the day
  const disabledTime = (current) => {
    if (startTime && current.isBefore(startTime)) {
      return true; // Disable times before the selected start time
    }
    if (endTime && current.isAfter(endTime)) {
      return true; // Disable times after the selected end time
    }
    return false;
  };

  return (
    <div className={cx("general")}>
      <div className={cx("dropdown")}>
        <button
          className={cx("dropdown-button", { clicked: isButtonClicked })}
          onClick={handleButtonClick}
        >
          <div className={cx("conner-left")}>
            <TrainingCalendarIcon />
            <p>General</p>
          </div>
          <div className={cx("conner-right")}>
            <DropDownCircleIcon />
          </div>
        </button>
        {isButtonClicked && (
          <div className={cx('dropdown-content', { 'opened': popupOpen })}>
            <div className={cx("dropdown-option1")}>
              <AlarmIcon />
              <p className={cx("class-time")}>Class time</p>
              <p>from</p>
              <TimePicker
                placeholder="--:--"
                format={format}
                style={{ width: "78px" }}
                inputStyle={{ width: "100%", height: "17px" }}
                suffixIcon={null}
                value={startTime}
                onChange={handleStartTimeChange}
                disabledTime={disabledTime}
              />
              <p>to</p>
              <TimePicker
                placeholder="--:--"
                format={format}
                style={{ width: "78px" }}
                inputStyle={{ width: "100%", height: "17px" }}
                suffixIcon={null}
                value={endTime}
                onChange={handleEndTimeChange}
                disabledTime={disabledTime}
              />
            </div>
            <div className={cx("dropdown-option2")}>
              <HomeworkIcon />
              <p>Location</p>
            </div>
            <div className={cx("dropdown-option3")}>
              <LectureIcon />
              <p>Trainer</p>
            </div>
            <div className={cx("dropdown-option4")}>
              <GradeIcon />
              <p>Admin</p>
              <select className={cx("select")} defaultValue="default">
                <option value="default" hidden>
                  Select
                </option>
                <option value="option1">Option 1</option>
              </select>
            </div>
            <div className={cx("dropdown-option5")}>
              <SupplierIcon />
              <p>FSU</p>
              <select className={cx("select")} defaultValue="default">
                <option value="default" hidden>
                  Select
                </option>
                <option value="option1">Option 1</option>
              </select>
            </div>
            <div className={cx("dropdown-option6")}>
              <select className={cx("select")} defaultValue="default">
                <option value="default" hidden>
                  Contacts
                </option>
                <option value="option1">Option 1</option>
              </select>
            </div>
            <div className={cx("Strange-line")}></div>
            <div className={cx("choose-action")}>
              <a>Created</a>
              <a>Review</a>
              <a>Approve</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default General;
