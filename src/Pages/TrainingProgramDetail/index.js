import classNames from "classnames/bind";
import styles from "../TrainingProgramDetail/TrainingProgramDetail.module.scss";
import DetailTitle from "../TrainingProgramDetail/ProgramDetailTitle";
import DetailDescription from "./ProgramDetailDescription";
import { SyllabusCard } from "../../Components/Common/SyllabusCard";
import ProgramManageBox from "./ProgamDetailManageBox";
import { useState } from "react";

function TrainingProgramDetail({ onClick }) {
  const cx = classNames.bind(styles);
  const [isProgramManageBoxVisible, setIsProgramManageBoxVisible] = useState(false);

  const handleMoreIconClick = () => {
    setIsProgramManageBoxVisible(!isProgramManageBoxVisible);
  };

  return (
    <div className={cx("container")}>
      <DetailTitle
        onClick={handleMoreIconClick}
        isVisible={isProgramManageBoxVisible}
        setIsVisible={setIsProgramManageBoxVisible}
      />

        {isProgramManageBoxVisible && (
          <ProgramManageBox
            onClose={() => setIsProgramManageBoxVisible(false)}
          />
        )}
      <DetailDescription />
      <div className={cx("content-container")}>
        <subtitle1 className={cx("text")}>Content</subtitle1>
        <SyllabusCard />
        <SyllabusCard />
        <SyllabusCard />
        <SyllabusCard />
        <SyllabusCard />
        <SyllabusCard />
      </div>
    </div>
  );
}

export default TrainingProgramDetail;
