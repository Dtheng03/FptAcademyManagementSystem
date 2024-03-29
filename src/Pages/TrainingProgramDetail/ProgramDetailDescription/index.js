import styles from "../ProgramDetailDescription/DetailDescription.module.scss";
import classNames from "classnames/bind";


const cx = classNames.bind(styles);
function DetailDescription({author, createDate, duration}) {
  return (
    <div className={cx("description-title")}>
      <div className={cx("line-1")}>
        <h4 className={cx("day-number")}>{duration}</h4>
        <subtitle1 className={cx("description-text")}>
          days
        </subtitle1>
      </div>

      <div className={cx("line-2")}>
        <subtitle2 className={cx("description-text")}>
          Modified on {createDate} by
        </subtitle2>
        <subtitle2 className={cx("author")}>{author}</subtitle2>
      </div>
    </div>
  );
}

export default DetailDescription;
