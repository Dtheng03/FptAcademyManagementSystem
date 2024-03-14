import React, { useState, useEffect } from "react"; // Import React
import styles from "./CreateClass.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import General from "./General/General";
import Schedule from "./Schedule/Schedule";
import Attendee from "./Attendee/Attendee";
import ClassTab from "./ClassTab/ClassTab";
import { notification } from "antd";

const cx = classNames.bind(styles);

function CreateClass() {
  const [className, setClassName] = useState("");
  const [isClassCreated, setIsClassCreated] = useState(false);

  const handleInputChange = (event) => {
    setClassName(event.target.value);
  };

  const handleCreateButton = () => {
    if (!className) {
      notification.warning({
        message: "Class name cannot be empty!",
        placement: "topRight",
      });
      return; // Don't proceed if class name is empty
    }
    setIsClassCreated(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCreateButton();
    }
  };

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={cx("create-class")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          {!isClassCreated && <h1>C l a s s</h1>}
          {isClassCreated && (
            <>
              <h1>C l a s s</h1>
              <h3>{className}</h3>
              {className && <p>HCM22_FR_DevOps_01</p>}

              <div className={cx("strange-line")}></div>
              <div className={cx("daysTimeChecker")}>
                <p className={cx("days")}>
                  <span className={cx("number")}></span> days
                </p>
                <p className={cx("hours")}>(hours)</p>
                <div className={cx("strange-line2")}></div>
              </div>
            </>
          )}
        </div>
        <div className={cx("create-form")}>
          {!isClassCreated && (
            <>
              <p className={cx("class-name-content")}>Class name</p>
              <div className={cx("search-variable")}>
                <input
                  type="text"
                  placeholder="Name the class"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <Button
                title="Create"
                type="normal"
                onClick={handleCreateButton}
              />
            </>
          )}
        </div>
        <div className={cx("top-content")}>
          {isClassCreated && <General />}
          {isClassCreated && <Schedule />}
        </div>
        <div className={cx("middle-content")}>
          {isClassCreated && <Attendee />}
        </div>
        <div className={cx("bottom-content")}>
          {isClassCreated && <ClassTab/> }
        </div>
      </div>
    </div>
  );
}

export default CreateClass;
