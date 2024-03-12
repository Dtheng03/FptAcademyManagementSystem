import React, { useState } from "react"; // Import React
import styles from "./ClassTab.module.scss";
import classNames from "classnames/bind";
import { SyllabusCard } from "../../../Components/Common/SyllabusCard/index";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const syllabusOptions = [
  "DevOps Foundation",
  "DevOps Beginner",
  "DevOps Advanced",
  // Add more options as needed
];

function ClassTab() {
  const [cancelIconVisible, setCancelIconVisible] = React.useState(true);

  return (
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
  );
}

export default ClassTab;
