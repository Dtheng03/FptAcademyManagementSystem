import Syllabus from "../../Components/Common/SyllabusTab/syllabus/syllabus";
import React, { useState, useEffect } from "react";
import style from "./SyllabusDetailInformation.module.scss";
import General from "./SyllabusGeneral";
import Outline from "./SyllabusOutline";
import Order from "./SyllabusOrder";
import classNames from "classnames/bind";
import SyllabusHeader from "./SyllabusHeader";
import SyllabusDescription from "./SyllabusDescription";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SyllabusDetailInformation() {
  const cx = classNames.bind(style);
  const [activeComponent, setActiveComponent] = useState(""); 
  const token = sessionStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const { id } = useParams();

  const handleTabClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className={cx("container")}>
      <SyllabusHeader id={id}/>

      <div className={cx("second-container")}>
        <SyllabusDescription id={id}/>

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
        {activeComponent === "General" && <General id={id} />}
        {activeComponent === "Outline" && <Outline id={id} />}
        {activeComponent === "Order" && <Order id={id} />}
      </div>
    </div>
  );
}
