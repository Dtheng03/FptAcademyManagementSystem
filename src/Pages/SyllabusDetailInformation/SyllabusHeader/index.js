import styles from "../SyllabusHeader/SyllabusHeader.module.scss"
import classNames from "classnames/bind";
import StatusChip from "../../../Components/Common/Status/StatusChip";
import { MoreIcon } from "../../../Components/Common/Icons/ActionIcons";


function SyllabusHeader(onClick) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx("header-container")}>
            <div className={cx("title-1")}>
                <h4 className={cx("syllabus-text")}>Syllabus</h4>
            </div>

            <div className={cx("header-body")}>
                <div className={cx("title-2")}>
                    <h3 className={cx("syllabus-text")}>C# Programing Language</h3>

                    <div className={cx("syllabus-status")}>
                        <StatusChip title={"Active"} />
                    </div>
                </div>
                <div className={cx("syllabus-more-icon")} onClick={onClick}>
                    <MoreIcon />
                </div>
            </div>
            <div className={cx("syllabus-version")}><h4 className={cx("version")}>NPL v4.0</h4></div>
        </div>
    )


}
export default SyllabusHeader;

