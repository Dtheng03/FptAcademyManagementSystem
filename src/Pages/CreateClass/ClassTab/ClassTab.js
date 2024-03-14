import React, { useState, useRef, useEffect } from "react"; // Import React
import styles from "./ClassTab.module.scss";
import classNames from "classnames/bind";
import { SyllabusCard } from "../../../Components/Common/SyllabusCard/index";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SearchIcon } from "../../../Components/Common/Icons/DocManageIcons/index";
import Syllabus from "../../../Components/Common/SyllabusTab/syllabus/syllabus";

const cx = classNames.bind(styles);

function ClassTab() {
  const [activeComponent, setActiveComponent] = useState("Training Program"); // Initialize with "Training Program"
  const buttonRef = useRef(null); // Define useRef for button element
  const [isOpen, setIsOpen] = useState(false); // Define state for dropdown visibility
  const dropdownContentRef = useRef(null); // Define useRef for dropdown content
  const selectRef = useRef(null); // Define useRef for select element
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [value, setValue] = useState("");

  const syllabusOptions = [
    "DevOps Foundation",
    "DevOps Beginner",
    "DevOps Advanced",
  ];

  useEffect(() => {
    const handleDocumentClick = (e) => {
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

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [cx]);

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

  const handleTabClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className={cx("create-trainning-program")}>
      <div className={cx("syllabus_tab_button")}>
        <div
          className={cx("button", {
            clicked: activeComponent === "Training Program",
          })}
          onClick={() => setActiveComponent("Training Program")}
        >
          <Syllabus
            name="Training Program"
            onClick={() => handleTabClick("Training Program")}
          />
        </div>
        <div
          className={cx("button", {
            clicked: activeComponent === "Attendee list",
          })}
          onClick={() => setActiveComponent("Attendee list")}
        >
          <Syllabus
            name="Attendee list"
            onClick={() => handleTabClick("Attendee list")}
          />
        </div>
        <div
          className={cx("button", { clicked: activeComponent === "Budget" })}
          onClick={() => setActiveComponent("Budget")}
        >
          <Syllabus name="Budget" onClick={() => handleTabClick("Budget")} />
        </div>
        <div
          className={cx("button", { clicked: activeComponent === "Others" })}
          onClick={() => setActiveComponent("Others")}
        >
          <Syllabus name="Others" onClick={() => handleTabClick("Others")} />
        </div>
      </div>
      {activeComponent === "Training Program" && (
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
          <div className={cx("select-tranning-program-body")}>
            <div className={cx("SyllybusCard")}>
              <div className={cx("image")}>
                <Avatar size="large" icon={<UserOutlined />} alt="" src="" />
              </div>
              <SyllabusCard />
            </div>
            <div className={cx("SyllybusCard")}>
              <div className={cx("image")}>
                <Avatar size="large" icon={<UserOutlined />} alt="" src="" />
              </div>
              <SyllabusCard />
            </div>
            <div className={cx("SyllybusCard")}>
              <div className={cx("image")}>
                <Avatar size="large" icon={<UserOutlined />} alt="" src="" />
              </div>
              <SyllabusCard />
            </div>
            <div className={cx("SyllybusCard")}>
              <div className={cx("image")}>
                <Avatar size="large" icon={<UserOutlined />} alt="" src="" />
              </div>
              <SyllabusCard />
            </div>
            <div className={cx("SyllybusCard")}>
              <div className={cx("image")}>
                <Avatar size="large" icon={<UserOutlined />} alt="" src="" />
              </div>
              <SyllabusCard />
            </div>
            <div className={cx("SyllybusCard")}>
              <div className={cx("image")}>
                <Avatar size="large" icon={<UserOutlined />} alt="" src="" />
              </div>
              <SyllabusCard />
            </div>
            <div className={cx("SyllybusCard")}>
              <div className={cx("image")}>
                <Avatar size="large" icon={<UserOutlined />} alt="" src="" />
              </div>
              <SyllabusCard />
            </div>
          </div>
          <div className={cx("select-tranning-program-footer")}></div>
        </div>
      )}
      {activeComponent === "Attendee list" && (
        <div className={cx("select-attendee-list")}>
          <div className={cx("select-attendee-list-header")}>
            <p className={cx("select-attendee-list-header-name")}>
              Attendee list
            </p>
          </div>
        </div>
      )}
      {activeComponent === "Budget" && (
        <div className={cx("select-Budget")}>
          <div className={cx("select-Budget-header")}>
            <p className={cx("select-Budget-header-name")}>Budget</p>
          </div>
        </div>
      )}
      {activeComponent === "Others" && (
        <div className={cx("select-Others")}>
          <div className={cx("select-Others-header")}>
            <p className={cx("select-Others-header-name")}>Others</p>
          </div>
        </div>
      )}
      <div className={cx("button-content")}>
        <div className={cx("left-button-content")}>
          {value.length > 0 && (
            <button className={cx("button1")} onClick={() => setValue("")}>
              Back
            </button>
          )}
        </div>
        <div className={cx("right-button-content")}>
          <p className={cx("cancel")}>Cancel</p>
          <button className={cx("button2")}>Save as draft</button>
          <button className={cx("button1")}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default ClassTab;
