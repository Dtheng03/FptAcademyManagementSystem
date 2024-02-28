import Syllabus from "../../Components/Common/SyllabusTab/syllabus/syllabus";
import React, { useState } from "react";
import style from "./SyllabusDetailInformation.module.scss";
import General from "./SyllabusGeneral";
import Outline from "./SyllabusOutline"
import classNames from "classnames/bind";
import SyllabusHeader from "./SyllabusHeader";
import SyllabusDescription from "./SyllabusDescription";

export default function SyllabusDetailInformation() {
  const name = "general";
  const name1 = "outline";
  const name2 = "order";
  const cx = classNames.bind(style);
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className={cx("container")}>
      <SyllabusHeader />

      <div className={cx("second-container")}>
        <SyllabusDescription />

        <div className={cx("category")}>
        <button
            className={cx("button", { clicked: activeComponent === "General" })}
            onClick={() => handleButtonClick("General")}
          >
            <Syllabus name={name} />
          </button>

          <button
            className={cx("button", { clicked: activeComponent === "Outline" })}
            onClick={() => handleButtonClick("Outline")}
          >
            <Syllabus name={name1} />
          </button>

          <button
            className={cx("button", { clicked: activeComponent === "Order" })}
            onClick={() => handleButtonClick("Order")}
          >
            <Syllabus name={name2} />
          </button>
        </div>
      </div>

      <div className={cx("content-container")}>
        {activeComponent === "General" && <General />}
        {activeComponent === "Outline" && <Outline />}
        {activeComponent === "Order" && <General/>}
      </div>
    </div>
  );
}
