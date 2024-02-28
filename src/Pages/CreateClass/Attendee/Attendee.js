import React, { useState } from "react"; // Import React
import styles from "./Attendee.module.scss";
import classNames from "classnames/bind";
import { DropDownCircleIcon } from "../../../Components/Common/Icons/ActionIcons/index";
import { GradeIcon } from "../../../Components/Common/Icons/IndicatorIcons/index";

const cx = classNames.bind(styles);

function Attendee() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
    setPopupOpen(!popupOpen);
  };

  return (
    <div className={cx("attendee")}>
      <div className={cx("dropdown")}>
        <button
          className={cx("dropdown-button", { clicked: isButtonClicked })}
          onClick={handleButtonClick}
        >
          <div className={cx("conner-left")}>
            <GradeIcon />
            <p>General</p>
            <select className={cx("select")} defaultValue="default">
              <option value="default" hidden>
                Select
              </option>
              <option value="option1">Option 1</option>
            </select>
          </div>
          <div className={cx("conner-right")}>
            <DropDownCircleIcon />
          </div>
        </button>
        {isButtonClicked && (
          <div className={cx('dropdown-content', { 'opened': popupOpen })}>
                <div className={cx("dropdown-option1")}>
                    <p>Planned</p>
                    <input type="text"/>
                </div>
                <div className={cx("dropdown-option2")}>
                    <p>Accepted</p>
                    <input type="text"/>
                </div>
                <div className={cx("dropdown-option3")}>
                    <p>Actual</p>
                    <input type="text"/>
                </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendee;
