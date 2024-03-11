import React, { useState, useEffect, useRef } from "react"; // Import React
import styles from "./CreateClass.module.scss";
import classNames from "classnames/bind";
import Button from "../../Components/Common/Button";
import General from "./General/General";
import Schedule from "./Schedule/Schedule";
import Syllabus from "../../Components/Common/SyllabusTab/syllabus/syllabus";
import { SearchIcon } from "../../Components/Common/Icons/DocManageIcons/index";
import Attendee from "./Attendee/Attendee";
import ClassTab from "./ClassTab/ClassTab";
import { notification } from "antd";

const cx = classNames.bind(styles);

const syllabusOptions = [
  "DevOps Foundation",
  "DevOps Beginner",
  "DevOps Advanced",
  // Add more options as needed
];

function CreateClass() {
  const [className, setClassName] = useState("");
  const [isClassCreated, setIsClassCreated] = useState(false);
  const buttonRef = useRef(null); // Define useRef for button element
  const selectRef = useRef(null); // Define useRef for select element
  const dropdownContentRef = useRef(null); // Define useRef for dropdown content

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

  const [value, setValue] = useState("");
  const syllabusNames = [
    "Training Program",
    "Attendee list",
    "Budget",
    "Others",
  ];
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value; // Convert input value to lowercase
    setValue(inputValue);

    // Filter the options based on the lowercase input value
    const filtered = syllabusOptions.filter((option) =>
      option.includes(inputValue)
    );
    setFilteredOptions(filtered);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (name) => {
    setValue(name);
    setIsOpen(false);
  };

  const handleDocumentClick = (e, cx) => {
    if (
      (buttonRef.current && buttonRef.current.contains(e.target)) ||
      (selectRef.current && selectRef.current.contains(e.target)) ||
      (dropdownContentRef.current &&
        dropdownContentRef.current.contains(e.target)) ||
      e.target.classList.contains(cx("input-text")) // Check if the click occurred inside the input field
    ) {
      return; // Clicked inside the button, select, dropdown content, or input field, don't close dropdown
    }
    setIsOpen(false); // Close the dropdown if clicked outside
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", (e) => handleDocumentClick(e, cx));
    return () => {
      document.removeEventListener("mousedown", (e) =>
        handleDocumentClick(e, cx)
      );
    };
  }, [cx]);

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
          {isClassCreated && (
            <div className={cx("create-trainning-program")}>
              <div className={cx("syllabus_tab_button")}>
                {syllabusNames.map((name, index) => (
                  <Syllabus key={index} name={name} />
                ))}
              </div>
              <div className={cx("select-tranning-program")}>
                <div className={cx("select-tranning-program-header")}>
                  <p className={cx("select-tranning-program-header-name")}>
                    Training Program name
                  </p>
                  <div className={cx("container")}>
                    <div
                      className={cx("search-input", { open: isOpen })}
                      onClick={toggleDropdown}
                      ref={dropdownContentRef}
                    >
                      <div className={cx("input-container")}>
                        <SearchIcon className={cx("dropdown-icon")} />
                        <input
                          className={cx("input-text")}
                          type="text"
                          value={value}
                          onChange={handleChange}
                          placeholder="Select program"
                          ref={selectRef}
                        />
                      </div>
                      {value.length > 0 &&
                        filteredOptions.length > 0 && ( // Conditionally render the dropdown if there are filtered options
                          <div className={cx("dropdown")}>
                            {filteredOptions.map((name, index) => (
                              <div
                                className={cx("view-select")}
                                key={index}
                                onClick={() => handleItemClick(name)}
                              >
                                {name}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <ClassTab />
                <div className={cx("select-tranning-program-footer")}></div>
              </div>
            </div>
          )}
        </div>
        {isClassCreated && (
          <div className={cx("button-content")}>
            <div className={cx("left-button-content")}>
              <button className={cx("button1")}>Back</button>
            </div>
            <div className={cx("right-button-content")}>
              <p className={cx("cancel")}>Cancel</p>
              <button className={cx("button2")}>Save as draft</button>
              <button className={cx("button1")}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateClass;
