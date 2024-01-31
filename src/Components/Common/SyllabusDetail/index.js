import "./SyllabusDetail.scss";
import StatusChip from "../Status/StatusChip";
import { OnlineStatus, OfflineStatus } from "../Status/Status";
import * as Icons from "../Icons/DeliveryTypesIcons";
import { LearningMaterialsIcon } from "../Icons/NavMenuIcons"

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
        <div className="syllabus-detail-container">
            <span className="info body2">
                {title}
            </span>
            <div className="desc">
                <span className="item1"><StatusChip title={standard} /></span>
                <span className="item1">{time}mins</span>
                <span className="item1">{status ? <OnlineStatus /> : <OfflineStatus />}</span>
                <span className="item">{icon}</span>
                <span className="item"><LearningMaterialsIcon /></span>
            </div>
        </div>
    );
}

export default SyllabusDetail;