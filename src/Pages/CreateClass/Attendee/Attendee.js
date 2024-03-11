// import React, { useState, useRef } from "react"; // Import React
// import styles from "./Attendee.module.scss";
// import classNames from "classnames/bind";
// import { DropDownCircleIcon } from "../../../Components/Common/Icons/ActionIcons/index";
// import { GradeIcon } from "../../../Components/Common/Icons/IndicatorIcons/index";

// const cx = classNames.bind(styles);

// function Attendee() {
//   const [isButtonClicked, setIsButtonClicked] = useState(false);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [plannedValue, setPlannedValue] = useState("");
//   const [acceptedValue, setAcceptedValue] = useState("");
//   const [actualValue, setActualValue] = useState("");
//   const selectRef = useRef(null);
//   const buttonRef = useRef(null);
//   const dropdownContentRef = useRef(null);

//   const handleButtonClick = () => {
//     setIsButtonClicked(!isButtonClicked);
//     setPopupOpen(!popupOpen);
//   };

//   const handleSelectClick = (e) => {
//     e.stopPropagation();
//   };

//   const handleDocumentClick = (e) => {
//     if (
//       buttonRef.current && buttonRef.current.contains(e.target) ||
//       selectRef.current && selectRef.current.contains(e.target) ||
//       dropdownContentRef.current && dropdownContentRef.current.contains(e.target)
//     ) {
//       return; // Clicked inside the button, select, or dropdown content, don't close dropdown
//     }
//     setIsButtonClicked(false);
//     setPopupOpen(false);
//   };

//   React.useEffect(() => {
//     document.addEventListener("mousedown", handleDocumentClick);
//     return () => {
//       document.removeEventListener("mousedown", handleDocumentClick);
//     };
//   }, []);

//   return (
//     <div className={cx("attendee")}>
//       <div className={cx("dropdown")}>
//         <button
//           ref={buttonRef}
//           className={cx("dropdown-button", { clicked: isButtonClicked })}
//           onClick={handleButtonClick}
//         >
//           <div className={cx("conner-left")}>
//             <GradeIcon />
//             <p>General</p>
//             <select
//               ref={selectRef}
//               className={cx("select")}
//               defaultValue="default"
//               onClick={handleSelectClick}
//             >
//               <option value="default" hidden>
//                 Select
//               </option>
//               <option value="option1">Option 1</option>
//             </select>
//           </div>
//           <div className={cx("conner-right", { spin: !popupOpen })}>
//             <DropDownCircleIcon />
//           </div>
//         </button>
//         {isButtonClicked && (
//           <div
//             ref={dropdownContentRef}
//             className={cx("dropdown-content", { opened: popupOpen })}
//           >
//             <div className={cx("dropdown-option1")}>
//               <p>Planned</p>
//               <input
//                 type="text"
//                 onClick={(e) => e.stopPropagation()}
//                 value={plannedValue}
//                 onChange={(e) => setPlannedValue(e.target.value)}
//               />
//             </div>
//             <div className={cx("dropdown-option2")}>
//               <p>Accepted</p>
//               <input
//                 type="text"
//                 onClick={(e) => e.stopPropagation()}
//                 value={acceptedValue}
//                 onChange={(e) => setAcceptedValue(e.target.value)}
//               />
//             </div>
//             <div className={cx("dropdown-option3")}>
//               <p>Actual</p>
//               <input
//                 type="text"
//                 onClick={(e) => e.stopPropagation()}
//                 value={actualValue}
//                 onChange={(e) => setActualValue(e.target.value)}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Attendee;

import React, { useState, useRef } from "react"; // Import React
import styles from "./Attendee.module.scss";
import classNames from "classnames/bind";
import { DropDownCircleIcon } from "../../../Components/Common/Icons/ActionIcons/index";
import { GradeIcon } from "../../../Components/Common/Icons/IndicatorIcons/index";

const cx = classNames.bind(styles);

function Attendee() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [plannedValue, setPlannedValue] = useState("");
  const [acceptedValue, setAcceptedValue] = useState("");
  const [actualValue, setActualValue] = useState("");
  const selectRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownContentRef = useRef(null);

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
    setPopupOpen(!popupOpen);
  };

  const handleSelectClick = (e) => {
    e.stopPropagation();
  };

  const handleDocumentClick = (e) => {
    if (
      buttonRef.current && buttonRef.current.contains(e.target) ||
      selectRef.current && selectRef.current.contains(e.target) ||
      dropdownContentRef.current && dropdownContentRef.current.contains(e.target)
    ) {
      return; // Clicked inside the button, select, or dropdown content, don't close dropdown
    }
    setIsButtonClicked(false);
    setPopupOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div className={cx("attendee")}>
      <div className={cx("dropdown")}>
        <button
          ref={buttonRef}
          className={cx("dropdown-button", { clicked: isButtonClicked })}
          onClick={handleButtonClick}
        >
          <div className={cx("conner-left")}>
            <GradeIcon />
            <p>General</p>
            <select
              ref={selectRef}
              className={cx("select")}
              defaultValue="default"
              onClick={handleSelectClick}
            >
              <option value="default" hidden>
                Select
              </option>
              <option value="option1">Option 1</option>
            </select>
          </div>
          <div className={cx("conner-right", { spin: !popupOpen })}>
            <DropDownCircleIcon />
          </div>
        </button>
        {isButtonClicked && (
          <div
            ref={dropdownContentRef}
            className={cx("dropdown-content", { opened: popupOpen })}
          >
            <div className={cx("dropdown-option1")}>
              <p>Planned</p>
              <input
                type="text"
                onClick={(e) => e.stopPropagation()}
                value={plannedValue}
                onChange={(e) => setPlannedValue(e.target.value)}
              />
            </div>
            <div className={cx("dropdown-option2")}>
              <p>Accepted</p>
              <input
                type="text"
                onClick={(e) => e.stopPropagation()}
                value={acceptedValue}
                onChange={(e) => setAcceptedValue(e.target.value)}
              />
            </div>
            <div className={cx("dropdown-option3")}>
              <p>Actual</p>
              <input
                type="text"
                onClick={(e) => e.stopPropagation()}
                value={actualValue}
                onChange={(e) => setActualValue(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendee;
