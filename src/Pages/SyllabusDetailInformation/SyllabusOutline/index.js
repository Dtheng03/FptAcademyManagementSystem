import { useState } from "react";
import style from "./SyllabusOutline.module.scss";
import classNames from "classnames/bind";
import { DropDownCircleIcon } from "../../../Components/Common/Icons/ActionIcons/index";
import SyllabusDetail from "../../../Components/Common/SyllabusDetail";
import { TimeAllocation } from "./TimeAllocation/TimeAllocation";

const cx = classNames.bind(style);

export default function Outline() {
  const [dropdowns, setDropdowns] = useState([
    { id: 2, day: "2", isButtonClicked: false, popupOpen: false, unitCount: 0 },
    { id: 3, day: "3", isButtonClicked: false, popupOpen: false, unitCount: 0 },
    { id: 4, day: "4", isButtonClicked: false, popupOpen: false, unitCount: 0 },
  ]);

  const data = [
    { label: "Assignment/Lab", percent: 54, color: "#F4BE37" },
    { label: "Concept/Lecture", percent: 29, color: "#FF9F40" },
    { label: "Guide/Review", percent: 9, color: "#0D2535" },
    { label: "Test/Quiz", percent: 1, color: "#5388D8" },
    { label: "Exam", percent: 6, color: "#206EE5" },
  ];

  const width = 200;
  const height = 200;

  const [contentDropdown2, setContentDropdown2] = useState([
    { id: 2, unit: "6", isButtonClicked2: false, popupOpen2: false },
    { id: 3, unit: "7", isButtonClicked2: false, popupOpen2: false },
    { id: 4, unit: "8", isButtonClicked2: false, popupOpen2: false },
    { id: 5, unit: "9", isButtonClicked2: false, popupOpen2: false },
    { id: 6, unit: "10", isButtonClicked2: false, popupOpen2: false },
    { id: 7, unit: "11", isButtonClicked2: false, popupOpen2: false },
    { id: 8, unit: "12", isButtonClicked2: false, popupOpen2: false },
    { id: 9, unit: "13", isButtonClicked2: false, popupOpen2: false },
    { id: 10, unit: "14", isButtonClicked2: false, popupOpen2: false },
    { id: 11, unit: "15", isButtonClicked2: false, popupOpen2: false },
    { id: 12, unit: "16", isButtonClicked2: false, popupOpen2: false },
    { id: 13, unit: "17", isButtonClicked2: false, popupOpen2: false },
    { id: 14, unit: "18", isButtonClicked2: false, popupOpen2: false },
    { id: 15, unit: "19", isButtonClicked2: false, popupOpen2: false },
    { id: 16, unit: "20", isButtonClicked2: false, popupOpen2: false },
    { id: 17, unit: "21", isButtonClicked2: false, popupOpen2: false },
    { id: 18, unit: "22", isButtonClicked2: false, popupOpen2: false },
    { id: 19, unit: "23", isButtonClicked2: false, popupOpen2: false },
    { id: 20, unit: "24", isButtonClicked2: false, popupOpen2: false },
    { id: 21, unit: "25", isButtonClicked2: false, popupOpen2: false },
    { id: 22, unit: "26", isButtonClicked2: false, popupOpen2: false },
    { id: 23, unit: "27", isButtonClicked2: false, popupOpen2: false },
    { id: 24, unit: "28", isButtonClicked2: false, popupOpen2: false },
    { id: 25, unit: "29", isButtonClicked2: false, popupOpen2: false },
    { id: 26, unit: "30", isButtonClicked2: false, popupOpen2: false },
  ]);

  const [isButtonClicked3, setIsButtonClicked3] = useState(false);
  const [popupOpen3, setPopupOpen3] = useState(false);

  const handleButtonClick3 = () => {
    setIsButtonClicked3(!isButtonClicked3); // Toggle button clicked state
    setPopupOpen3(!popupOpen3); // Toggle popup open/close
  };

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

  const handleButtonClick2 = (id) => {
    // Find the corresponding content dropdown
    const updatedContentDropdown2 = contentDropdown2.find(
      (contentDropdown) => contentDropdown.id === id
    );

    // Find the corresponding day dropdown
    const dayDropdown = dropdowns.find((dropdown) => dropdown.id === id);

    // If the unit button is not clicked and the unit count is less than 2, or if it is clicked and the count is greater than 0
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

      // Update the unit count based on whether the button is clicked or not
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
    <div className={cx("outline")}>
      <div className={cx("outline-style")}>
        {dropdowns.map((dropdown) => (
          <div key={dropdown.id} className={cx("dropdown", { clicked: dropdown.isButtonClicked })}>
            <button
              className={cx("dropdown-button", {
                clicked: dropdown.isButtonClicked,
              })}
              onClick={() => handleButtonClick(dropdown.id)}
            >
              <p>day {dropdown.day}</p>
            </button>
            {dropdown.isButtonClicked && (
              <div
                className={cx("dropdown-content", {
                  opened: dropdown.popupOpen,
                })}
              >
                {contentDropdown2.map((contentDropdown) => (
                  <div
                    key={contentDropdown.id}
                    className={cx("dropdown-content-button")}
                  >
                    {dropdown.id === contentDropdown.id && (
                      <div className={cx("content-dropdown-fa")}>
                        <div className={cx("content-dropdown-name")}>
                          <p>Unit {contentDropdown.unit}</p>
                        </div>
                        <div className={cx("content-dropdown-view")}>
                          <button
                            className={cx("dropdown-button2", {
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
                          {contentDropdown.isButtonClicked2 &&
                            dropdown.id === contentDropdown.id && (
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
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={cx("time-allocation")}>
        <div className={cx("dropdown3")}>
          <button
            className={cx("dropdown-button3", { clicked: isButtonClicked3 })}
            onClick={handleButtonClick3}
          >
            <p>Time allocation</p>
          </button>
          {isButtonClicked3 && (
            <div className={cx("dropdown-content3", { opened: popupOpen3 })}>
              <div className={cx("dropdown-option1")}>
                <TimeAllocation data={data} width={width} height={height} />
                <div className={cx("dropdown-content1")}>
                  <div className={cx("form-view-mini")}>
                    <div
                      style={{
                        width: "6.96px", // Set the width and height to create a circle
                        height: "6.96px",
                        borderRadius: "50%", // Set border-radius to 50% to create a circle
                        backgroundColor: "#F4BE37", // Set background color to yellow
                      }}
                    ></div>
                    <div>
                      <p>Assignment/Lab</p>
                      <p>(54%)</p>
                    </div>
                  </div>
                  <div className={cx("form-view-mini")}>
                    <div
                      style={{
                        width: "6.96px", // Set the width and height to create a circle
                        height: "6.96px",
                        borderRadius: "50%", // Set border-radius to 50% to create a circle
                        backgroundColor: "#FF9F40", // Set background color to yellow
                      }}
                    ></div>
                    <div>
                      <p>Concept/Lecture</p>
                      <p>(29%)</p>
                    </div>
                  </div>
                  <div className={cx("form-view-mini")}>
                    <div
                      style={{
                        width: "6.96px", // Set the width and height to create a circle
                        height: "6.96px",
                        borderRadius: "50%", // Set border-radius to 50% to create a circle
                        backgroundColor: "#0D2535", // Set background color to yellow
                      }}
                    ></div>
                    <div>
                      <p>Guide/Review</p>
                      <p>(9%)</p>
                    </div>
                  </div>
                  <div className={cx("form-view-mini")}>
                    <div
                      style={{
                        width: "6.96px", // Set the width and height to create a circle
                        height: "6.96px",
                        borderRadius: "50%", // Set border-radius to 50% to create a circle
                        backgroundColor: "#5388D8", // Set background color to yellow
                      }}
                    ></div>
                    <div>
                      <p>Test/Quiz</p>
                      <p>(1%)</p>
                    </div>
                  </div>
                  <div className={cx("form-view-mini")}>
                    <div
                      style={{
                        width: "6.96px", // Set the width and height to create a circle
                        height: "6.96px",
                        borderRadius: "50%", // Set border-radius to 50% to create a circle
                        backgroundColor: "#206EE5", // Set background color to yellow
                      }}
                    ></div>
                    <div>
                      <p>Exam</p>
                      <p>(6%)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
