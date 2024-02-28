import React, { useState } from "react"; // Import React
import styles from "./ClassTab.module.scss";
import classNames from "classnames/bind";
import Syllabus from "../../../Components/Common/SyllabusTab/syllabus/syllabus";
import { SearchIcon } from "../../../Components/Common/Icons/DocManageIcons/index";

const cx = classNames.bind(styles);

const syllabusOptions = [
  "DevOps Foundation",
  "DevOps Beginner",
  "DevOps Advanced",
  // Add more options as needed
];

function ClassTab() {
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
    const inputValue = event.target.value.toLowerCase();
    setValue(inputValue);

    // Filter the options based on the user input
    const filtered = syllabusOptions.filter((option) =>
      option.toLowerCase().includes(inputValue)
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

  return (
    <div className={cx("create-trainning-program")}>
      <div className={cx("syllabus_tab_button")}>
        {syllabusNames.map((name, index) => (
          <Syllabus key={index} name={name} />
        ))}
      </div>
      <div className={cx("select-tranning-program")}>
        <div className={cx("select-tranning-program-header")}>
          <p>Training Program name</p>
          <div className={cx("container")}>
          <div
            className={cx("search-input", { open: isOpen })}
            onClick={toggleDropdown}
          >
            <div className={cx("input-container")}>
            <SearchIcon className={cx("dropdown-icon")} />
              <input
                className={cx("input-text")}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Select program"
              />
            </div>
            <div className={cx("dropdown")}>
              {syllabusOptions
                .filter((name) =>
                  name.toLowerCase().includes(value.toLowerCase())
                )
                .map((name, index) => (
                  <div className={cx("view-select")} key={index} onClick={() => handleItemClick(name)}>
                    {name}
                  </div>
                ))}
            </div>
          </div>
          </div>
        </div>
        <div></div>
        <div className={cx("select-tranning-program-footer")}></div>
      </div>
    </div>
  );
}

export default ClassTab;
