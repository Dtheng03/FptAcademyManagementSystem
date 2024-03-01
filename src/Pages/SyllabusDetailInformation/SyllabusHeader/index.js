import React, { useState } from "react";
import styles from "../SyllabusHeader/SyllabusHeader.module.scss";
import classNames from "classnames/bind";
import StatusChip from "../../../Components/Common/Status/StatusChip";
import { MoreIcon } from "../../../Components/Common/Icons/ActionIcons";
import { Popover } from "antd";


function SyllabusHeader({ onClick }) {
  const cx = classNames.bind(styles);
  const [open,setOpen] = useState (false); 
  return (
    <div className={cx("header-container")}>
      <div className={cx("title-1")}>
        <h4 className={cx("syllabus-text")}>Syllabus</h4>
      </div>

      <div className={cx("header-body")}>
        <div className={cx("title-2")}>
          <h3 className={cx("syllabus-text")}>C# Programming Language</h3>

          <div className={cx("syllabus-status")}>
            <StatusChip title={"Active"} />
          </div>
        </div>

        <div className={cx("click")}>
            <Popover
          trigger=" click "
          placement="bottomRight"
          open={open}
          onOpenChange={()=>{setOpen(!open)}}
          content={
            
            <div className={cx("category-2")} style={{ display: "flex" , flexDirection: "column"} }>
                <p>Manage </p>
              <button style={{border : "none" ,outline : "none" ,background : "#fff"} }>Edit syllabus</button>

              <button style={{border : "none" ,outline : "none" ,background : "#fff"} }>Duplicate syllabus</button>

              <button style={{border : "none" ,outline : "none" ,background : "#fff"} }>De-activate syllabus</button>

              <button style={{border : "none" ,outline : "none" ,background : "#fff"} }>Delete syllabus</button>
            </div>
          }
        >
          <button className={cx("syllabus-more-icon")} onClick={()=>setOpen(!open)}>
            <MoreIcon />
          </button>
        </Popover></div>
        



      </div>
      <div className={cx("syllabus-version")}>
        <h4 className={cx("version")}>NPL v4.0</h4>
      </div>
    </div>
  );
}

export default SyllabusHeader;
