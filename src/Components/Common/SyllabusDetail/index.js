import styles from "./SyllabusDetail.module.scss";
import classNames from "classnames/bind";
import StatusChip from "../Status/StatusChip";
import { OnlineStatus, OfflineStatus } from "../Status/Status";
import * as Icons from "../Icons/DeliveryTypesIcons";
import { LearningMaterialsIcon } from "../Icons/NavMenuIcons"

const cx = classNames.bind(styles);

function SyllabusDetail({ title, standard, status, time, type }) {
    let icon = "";

    if (type === "lecture") {
        icon = <Icons.LectureIcon />
    } else if (type === "lab") {
        icon = <Icons.LabIcon />
    } else if (type === "review") {
        icon = <Icons.ReviewIcon />
    }

    return (
        <div className={cx("container")}>
            <span className={cx("info")}>
                {title}
            </span>
            <div className={cx("desc")}>
                <span className={cx("item1")}><StatusChip title={standard} /></span>
                <span className={cx("item1")}>{time}mins</span>
                <span className={cx("item1")}>{status ? <OnlineStatus /> : <OfflineStatus />}</span>
                <span className={cx("item")}>{icon}</span>
                <span className={cx("item")}><LearningMaterialsIcon /></span>
            </div>
        </div>
    );
}

export default SyllabusDetail;