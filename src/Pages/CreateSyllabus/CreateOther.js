import React, { useState } from "react";
import ReactQuill from "react-quill";

const CreateOther = () => {
  const [trainingDeliveryPrinciple, setTrainingDeliveryPrinciple] = useState("");
  const [technicalRequirement, setTechnicalRequirement] = useState("");

  return (
    <div className="syllabusTabContainer">
      <div className="syllabusTabContent">
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
          
        </div>

        <div className="technicalRequirement" style={{ display: "block" }}>
          <p className="subtitle1" style={{ paddingBottom: "10px" }}>
            Technical Requirement(s){" "}
          </p>

          <ReactQuill
            theme="snow"
            style={{
              marginBottom: "10px",
              width: "98%",
              height: "138px",
              resize: "none",
              overflowY: "auto",
              border: "0.5px solid #b3a9a9",
              borderRadius: "10px",
            }}
            className="ql-container-technical-requirement"
            value={technicalRequirement}
            onChange={(value) => setTechnicalRequirement(value)}
            modules={{
              toolbar: false,
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
            className="ql-container-course-objectives"
            value={trainingDeliveryPrinciple}
            onChange={(value) => setTrainingDeliveryPrinciple(value)}
            modules={{
              toolbar: {
                container: [
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
    </div>
  );
};

export default CreateOther;
