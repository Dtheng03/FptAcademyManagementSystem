import { InputNumber } from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TimeAllocation from "../../Components/Common/TimeAllocation/TimeAllocation";

const CreateGeneral = () => {
  const [courseObjectives, setCourseObjectives] = useState("");

  return (
    <div
      className="syllabusTabContainer"
      
    >
      <div
        className="syllabusTabContent"
      >
        <div className="baseGeneralSetup">
          <div className="selectLevel" style={{ display: "flex" }}>
            <p className="subtitle1" style={{ paddingRight: "40px" }}>
              Level
            </p>
            <select className="optionLevel ">
              <option className="subtitle2">Auto detect</option>
              <option className="subtitle2">Auto detect</option>
            </select>
          </div>
          <div className="attendeeNumbers" style={{ display: "flex" }}>
            <p className="subtitle1">Attendee numbers</p>
            <InputNumber min={1} max={30} defaultValue={3} />
          </div>
        </div>

        <div className="technicalRequirement" style={{ display: "block" }}>
          <p className="subtitle1" style={{ paddingBottom: "10px" }}>
            Technical Requirement(s){" "}
          </p>
          <textarea
            style={{
              padding: "10px",
              width: "98%",
              height: "138px",
              border: "0.5px solid #b3a9a9",
              borderRadius: "10px",
              resize: "none",
              overflowY: "auto",
            }}
          />
        </div>

        <div className="courseObjectives " style={{ display: "block" }}>
          <p className="subtitle1" style={{ paddingBottom: "10px" }}>
            Course Objectives{" "}
          </p>

          <ReactQuill
            theme="snow"
            style={{
              width: "98%",
              height: "310px",
              borderRadius: "10px", 
            }}
            className="ql-container"
            value={courseObjectives}
            onChange={(value) => setCourseObjectives(value)}
            modules={{
              toolbar: {
                container: [
                  ["undo", "redo"],
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ align: [] }],
                  [{ color: [] }, { background: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["code-block"],
                ],
              },
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "link",
              "image",
              "video",
              "code-block",
              "color",
              "background",
              "align",
            ]}
          />
        </div>
      </div>
      <div className="timeAllocation" style={{width: "18%"}}>
        <TimeAllocation />
      </div>
    </div>
  );
};

export default CreateGeneral;