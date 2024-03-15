import classNames from "classnames/bind";
import styles from "../SyllabusOfProgram/SyllabusOfProgram.module.scss";
import { SyllabusCard } from "../../../Components/Common/SyllabusCard";
import { DropDownCircleIcon } from "../../../Components/Common/Icons/ActionIcons/index";
import SyllabusDetail from "../../../Components/Common/SyllabusDetail";
import { useState } from "react";

function SyllabusOfProgram() {
  const cx = classNames.bind(styles);

  const [dropdowns, setDropdowns] = useState([
    { id: 2, day: "2", isButtonClicked: false, popupOpen: false, unitCount: 0 },
    { id: 3, day: "3", isButtonClicked: false, popupOpen: false, unitCount: 0 },
    { id: 4, day: "4", isButtonClicked: false, popupOpen: false, unitCount: 0 },
  ]);

  const [contentDropdown2, setContentDropdown2] = useState([
    { id: 2, unit: "6", isButtonClicked2: false, popupOpen2: false },
    { id: 2, unit: "8", isButtonClicked2: false, popupOpen2: false },
    { id: 3, unit: "7", isButtonClicked2: false, popupOpen2: false },
    { id: 4, unit: "8", isButtonClicked2: false, popupOpen2: false },
  ]);

  const handleButtonClick = (id) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.map((dropdown) =>
        dropdown.id === id
          ? {
              ...dropdown,
              isButtonClicked: !dropdown.isButtonClicked,
              popupOpen: !dropdown.popupOpen,
            }
          : dropdown
      )
    );
  };

  const handleDayClick = (id) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.map((dropdown) =>
        dropdown.id === id
          ? { ...dropdown, popupOpen: !dropdown.popupOpen }
          : dropdown
      )
    );
  };

  const handleButtonClick2 = (id) => {
    const updatedContentDropdown2 = contentDropdown2.find(
      (contentDropdown) => contentDropdown.id === id
    );

    const dayDropdown = dropdowns.find((dropdown) => dropdown.id === id);

    if (
      (!updatedContentDropdown2.isButtonClicked2 &&
        dayDropdown.unitCount < 2) ||
      (updatedContentDropdown2.isButtonClicked2 && dayDropdown.unitCount > 0)
    ) {
      setContentDropdown2((prevContentDropdown2) =>
        prevContentDropdown2.map((contentDropdown) =>
          contentDropdown.id === id
            ? {
                ...contentDropdown,
                isButtonClicked2: !contentDropdown.isButtonClicked2,
                popupOpen2: !contentDropdown.popupOpen2,
              }
            : contentDropdown
        )
      );

      setDropdowns((prevDropdowns) =>
        prevDropdowns.map((dropdown) =>
          dropdown.id === id
            ? {
                ...dropdown,
                unitCount: updatedContentDropdown2.isButtonClicked2
                  ? dropdown.unitCount - 1
                  : dropdown.unitCount + 1,
              }
            : dropdown
        )
      );
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("syllabuscard-display-style")}>
        {dropdowns.map((dropdown) => (
          <div
            key={dropdown.id}
            className={cx("syllabuscard-dropdown", {
              clicked: dropdown.isButtonClicked,
            })}
          > 
            <button
              className={cx("dropdown-btn", {
                clicked: dropdown.isButtonClicked,
              })}
              onClick={() => handleButtonClick(dropdown.id)}
            >
              <SyllabusCard syllabusCardId={dropdown.id} onClick={(e) => e.stopPropagation()} />
            </button>
            {dropdown.isButtonClicked && (
              <div
                className={cx("dropdown-content", {
                  opened: dropdown.popupOpen,
                })}
              >
                <button
                  className={cx("day-dropdown-btn")}
                  onClick={() => handleDayClick(dropdown.id)}
                >
                  <p>day {dropdown.day}</p>
                </button>

                {dropdown.popupOpen && (
                  <div className={cx("dropdown-day-content")}>
                    {contentDropdown2
                      .filter(
                        (contentDropdown) => contentDropdown.id === dropdown.id
                      )
                      .map((contentDropdown) => (
                        <div
                          key={contentDropdown.id}
                          className={cx("content-dropdown-btn")}
                        >
                          <div className={cx("content-dropdown-fa")}>
                            <div className={cx("content-dropdown-name")}>
                              <p>Unit {contentDropdown.unit}</p>
                            </div>
                            <div className={cx("content-dropdown-view")}>
                              <button
                                className={cx("dropdown-btn2", {
                                  clicked: contentDropdown.isButtonClicked2,
                                })}
                                onClick={() =>
                                  handleButtonClick2(contentDropdown.id)
                                }
                              >
                                <div className={cx("conner-left")}>
                                  <p>.NET Introduction</p>
                                  <p className={cx("form-p")}>3hrs</p>
                                </div>
                                <div className={cx("conner-right")}>
                                  <DropDownCircleIcon />
                                </div>
                              </button>
                              {contentDropdown.isButtonClicked2 && (
                                <div
                                  className={cx("details-dropdown-content", {
                                    opened: contentDropdown.popupOpen2,
                                  })}
                                >
                                  <SyllabusDetail
                                    title="Introduction to .NET"
                                    standard="Standard"
                                    time="180"
                                    type="lecture"
                                  />
                                  <SyllabusDetail
                                    title="Introduction to .NET"
                                    standard="Standard"
                                    time="180"
                                    type="lecture"
                                  />
                                  <SyllabusDetail
                                    title="Introduction to .NET"
                                    standard="Standard"
                                    time="180"
                                    type="lecture"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SyllabusOfProgram;
