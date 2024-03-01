import Syllabus from "../../Components/Common/SyllabusTab/syllabus/syllabus";
import React, { useState } from "react";
import style from "./SyllabusDetailInformation.module.scss";
import General from "./SyllabusGeneral";
import Outline from "./SyllabusOutline";
import Order from "./SyllabusOrder";
import classNames from "classnames/bind";
import SyllabusHeader from "./SyllabusHeader";
import SyllabusDescription from "./SyllabusDescription";

export default function SyllabusDetailInformation() {
  const cx = classNames.bind(style);
  const [activeComponent, setActiveComponent] = useState(""); 

  const handleTabClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className={cx("container")}>
      <SyllabusHeader />

      <div className={cx("second-container")}>
        <SyllabusDescription />

        <div className={cx("category")}>
          <div
            className={cx("button", { clicked: activeComponent === "General" })}
            onClick={() => setActiveComponent("General")}
          >
            <Syllabus name="general" />
          </div>

          <div
            className={cx("button", { clicked: activeComponent === "Outline" })}
            onClick={() => setActiveComponent("Outline")}
          >
            <Syllabus name="outline" />
          </div>

          <div
            className={cx("button", { clicked: activeComponent === "Order" })}
            onClick={() => setActiveComponent("Order")}
          >
            <Syllabus name="order" />
          </div>
        </div>
      </div>

      <div className={cx("content-container")}>
        {activeComponent === "General" && <General />}
        {activeComponent === "Outline" && <Outline />}
        {activeComponent === "Order" && <Order />}
      </div>
    </div>
  );
}
