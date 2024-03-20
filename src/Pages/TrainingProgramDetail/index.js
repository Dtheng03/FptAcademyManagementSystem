import classNames from "classnames/bind";
import styles from "../TrainingProgramDetail/TrainingProgramDetail.module.scss";
import DetailTitle from "../TrainingProgramDetail/ProgramDetailTitle";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SyllabusOfProgram from "./SyllabusOfProgram";

function TrainingProgramDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isDomChange, setIsDomChange] = useState(false);
  const [loading, setLoading] = useState(true);

  const cx = classNames.bind(styles);

  return (
    <div className={cx("container")}>
      <DetailTitle
        itemId={id}
        domChange={() => setIsDomChange(true)}
        domChangeSuccess={() => setIsDomChange(false)}
      />
      <div className={cx("content-container")}>
        <subtitle1 className={cx("text")}>Content</subtitle1>
        <div className={cx("syllabus-list")}>
          <SyllabusOfProgram syllabusCardId={id}/>
        </div>
      </div>
    </div>
  );
}

export default TrainingProgramDetail;
