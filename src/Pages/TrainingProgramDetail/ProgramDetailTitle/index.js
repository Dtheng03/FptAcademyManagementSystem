import styles from "./DetailTitle.module.scss";
import StatusChip from "../../../Components/Common/Status/StatusChip";
import classNames from "classnames/bind";
import { MoreIcon } from "../../../Components/Common/Icons/ActionIcons";

const cx = classNames.bind(styles);

function DetailTitle({ onClick, isVisible, setIsVisible }) {
  return (
    <div className={cx("title-container")}>
      <div className={cx("title-1")}>
        <h4 className={cx("program-text")}>Training Program</h4>
      </div>

      <div className={cx("title-body")}>
        <div className={cx("title-2")}>
          <h3 className={cx("program-text")}>DevOps Foundation</h3>

          <div className={cx("program-status")}>
            <StatusChip title={"Active"} />
          </div>
        </div>
        <div className={cx("program-more-icon")} onClick={onClick}>
          <MoreIcon />
        </div>
      </div>
    </div>
  );
}

export default DetailTitle;
