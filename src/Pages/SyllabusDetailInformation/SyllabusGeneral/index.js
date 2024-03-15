import {
  FocusIcon,
  GradeIcon,
  VerifiedUserIcon,
} from "../../../Components/Common/Icons/IndicatorIcons";
import {
  UserManagementIcon,
  SettingIcon,
} from "../../../Components/Common/Icons/NavMenuIcons";
import StatusChip from "../../../Components/Common/Status/StatusChip";
import style from "./General.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

export default function General({ id }) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!id) return;

    axios
      .get(
        `http://fams-group1-net03.ptbiology.com/api/syllabus/view-details-syllabus?syllabusId=${id}`
      )
      .then((response) => {
        // Handle successful response
        console.log("Response from API:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <div className={cx("container")}>
      <div className={cx("body")}>
        <div className={cx("display-box-1")}>
          <div className={cx("line-1")}>
            <div className={cx("inner-line")}>
              <div className={cx("icon")}>
                <GradeIcon />
              </div>
              <p className={cx("text")}>Level</p>
            </div>

            <p className={cx("level")}>{data.data && data.data.level}</p>
          </div>

          <div className={cx("line-2")}>
            <div className={cx("inner-line")}>
              <div className={cx("icon")}>
                <UserManagementIcon />
              </div>
              <p className={cx("text")}>Attendee number</p>
            </div>
            <p className={cx("number")}>
              {data.data && data.data.attendeeNumber}
            </p>
          </div>

          <div className={cx("line-3")}>
            <div className={cx("inner-line")}>
              <div className={cx("icon")}>
                <VerifiedUserIcon />
              </div>
              <p className={cx("text")}>Output standard</p>
            </div>
            <div className={cx("standar")}>
              <StatusChip title={"H4SD"} /> <StatusChip title={"K6SD"} />
              <StatusChip title={"H6SD"} />
            </div>
          </div>
        </div>
        <div className={cx("display-box-2")}>
          <div>
            <div className={cx("content")}>
              <SettingIcon />
              Technical Requirement(s)
            </div>
            <div className={cx("content")}>
              Trainees' PCs need to have the following software installed and
              running without any issues:
            </div>
            <div>
              <ul className={cx("list")}>
                <li>
                  {data.data && data.data.technicalRequirements
                    ? data.data.technicalRequirements
                    : "nothing"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("body-2")}>
        <div className={cx("content-2")}>
          <div className={cx("text-head")}>
            <FocusIcon />
            Course Objectives
          </div>
          <div className={cx("text")}>
            This topic introduces C# programming language knowledge and adapts
            trainees with skills, lessons, and practices specifically used in
            Fsoft projects.
          </div>
          <div className={cx("text")}>
            Upon completion of the topic, trainees will:
          </div>
          <ul className={cx("list")}>
          {(data.data && data.data.courseObjectives)
              ? data.data.courseObjectives.split("\n").map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              : <li>nothing to print</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
