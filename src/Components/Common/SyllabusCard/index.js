import { CancleIcon } from "../Icons/ActionIcons";
import "../SyllabusCard/index.scss";
import StatusChip from "../Status/StatusChip";

export function SyllabusCard({
  name = "Linux",
  subTitle = "LIN v2.0",
  date = "4 days (12 hours)",
  modifyDate = "23/07/2022",
  author = "Johny Deep",
  onClick,
}) {
  return (
    <div className="syllabus_card">
      <div className="header_container">
        <div className="header">
          <h4 className="title">{name}</h4>
          <StatusChip title={"Active"} />
        </div>
        <CancleIcon visiblility={"hidden"}/>
      </div>

      <div className="body_container">
        <div className="body">
          <span className="subtitle2">{subTitle}</span>
          <span className="subtitle2">|</span>
          <span className="subtitle2">{date}</span>
          <span className="subtitle2">|</span>
          <span className="subtitle2">
            Modified on {modifyDate} by {author}
          </span>
        </div>
      </div>
    </div>
  );
}
