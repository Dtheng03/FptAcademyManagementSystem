import {
  CreateIcon,
  CopyIcon,
  DeleteForeverIcon,
} from "../../../Components/Common/Icons/DocManageIcons";
import { LearningMaterialsIcon } from "../../../Components/Common/Icons/NavMenuIcons";
import { VisibilityOffIcon } from "../../../Components/Common/Icons/ActionIcons";
import { Divider } from "antd";
import { Card } from "antd";
import classNames from "classnames/bind";
import styles from "../ProgamDetailManageBox/ProgramManageBox.module.scss";

function ProgramManageBox() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("manage-box-container")}>
      <Card className={cx("manage-actions")}>
        <p className={cx("title")}>Manage</p>
        <Divider />
        <div className={cx("material")}>
          <LearningMaterialsIcon className={cx("icon")} />
          Training material
        </div>
        <div className={cx("edit")}>
          <CreateIcon className={cx("icon")} />
          Edit
        </div>
        <div className={cx("duplicate")}>
          <CopyIcon className={cx("icon")} />
          Duplicate program
        </div>
        <div className={cx("de-activate")}>
          <VisibilityOffIcon className={cx("icon")} />
          De-activate program
        </div>
        <div className={cx("delete")}>
          <DeleteForeverIcon className={cx("icon")} />
          Delete program
        </div>
      </Card>
    </div>
  );
}

export default ProgramManageBox;
