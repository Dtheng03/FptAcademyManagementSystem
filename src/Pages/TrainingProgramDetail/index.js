import classNames from "classnames/bind";
import styles from "../TrainingProgramDetail/TrainingProgramDetail.module.scss";
import DetailTitle from "../TrainingProgramDetail/ProgramDetailTitle";
import DetailDescription from "./ProgramDetailDescription";
import { SyllabusCard } from "../../Components/Common/SyllabusCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TrainingProgramDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isDomChange, setIsDomChange] = useState(false);
  const [loading, setLoading] = useState(true);

  const cx = classNames.bind(styles);

  {/*useEffect(() => {
    async function getProgramDetail() {
      try {
        const response = await axios.get(
          "https://65411666f0b8287df1fdc4fa.mockapi.io/program"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getProgramDetail();
  }, []);*/}

  return (
    <div className={cx("container")}>
      <DetailTitle
        itemId={id}
        domChange={() => setIsDomChange(true)}
        domChangeSuccess={() => setIsDomChange(false)}
      />
      <div className={cx("content-container")}>
        <subtitle1 className={cx("text")}>Content</subtitle1>
        <SyllabusCard />
        <SyllabusCard />
      </div>
    </div>
  );
}

export default TrainingProgramDetail;
