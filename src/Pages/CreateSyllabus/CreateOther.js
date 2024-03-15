import React, { useState } from "react";
import ReactQuill from "react-quill";
import TimeAllocation from "../../Components/Common/TimeAllocation/TimeAllocation";
import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";

const CreateOther = () => {
  const [trainingDeliveryPrinciple, setTrainingDeliveryPrinciple] =
    useState("");

  const assessmentWeight = [
    "5%", "10%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", "50%", "55%", "60%", "65%", "70%", "75%", "80%", "85%", "90%", "95%", "100%",];

  const numberOfTaskPassingCriteria = [
    "50%", "60%", "70%", "80%", "90%", "100%",
  ];

  return (
    <div className="syllabusOtherTabContainer" style={{ width: "98%", }}>
      <div className="syllabusOtherTabContent">
        <div className="allocateTimeAndScheme">
          <div className="otherTimeAllocation">
            <TimeAllocation width={474.9} height={225} outerRadius={90} />
          </div>
          <div className="assessmentScheme">
            <div className="otherAssessmentSchemeTitle">
              <p className="subtitle1">Assessment scheme</p>
            </div>
            <div className="assessmentSchemeContent">
              <div className="quiz assessmentWidth">
                <div className="assessmentTitle">
                  <p className="body2">Quiz *</p>
                </div>
                <div className="assessmentInput">
                  <Select style={{ width: "100%" }}>
                    {assessmentWeight.map((type, index) => (
                      <Option key={index} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="assignment assessmentWidth">
                <div className="assessmentTitle">
                  <p className="body2">Assignment *</p>
                </div>
                <div className="assessmentInput">
                  <Select style={{ width: "100%" }}>
                    {assessmentWeight.map((type, index) => (
                      <Option key={index} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="final assessmentWidth">
                <div className="assessmentTitle">
                  <p className="body2">Final *</p>
                </div>
                <div className="assessmentInput">
                  <Select style={{ width: "100%" }}>
                    {assessmentWeight.map((type, index) => (
                      <Option key={index} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="finalIngredient ">
                <div className="finalTheory assessmentWidth">
                  <div className="assessmentTitle">
                    <p className="body2">Final Theory*</p>
                  </div>
                  <div className="assessmentInput">
                    <Select style={{ width: "100%" }}>
                      {assessmentWeight.map((type, index) => (
                        <Option key={index} value={type}>
                          {type}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="finalPractice assessmentWidth">
                  <div className="assessmentTitle">
                    <p className="body2">Final Practice*</p>
                  </div>
                  <div className="assessmentInput">
                    <Select style={{ width: "100%" }}>
                      {assessmentWeight.map((type, index) => (
                        <Option key={index} value={type}>
                          {type}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="passingCriteria">
                <div
                  className="passingCriteriatitle"
                  style={{ marginBottom: "15px" }}
                >
                  <p className="subtitle2">Passing criteria</p>
                </div>
                <div className="assessmentWidth">
                  <div className="assessmentTitle">
                    <p className="body2">GPA *</p>
                  </div>
                  <div className="assessmentInput">
                    <Select style={{ width: "100%" }}>
                      {numberOfTaskPassingCriteria.map((type, index) => (
                        <Option key={index} value={type}>
                          {type}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="trainingDeliveryPrinciple "
          style={{
            display: "block",
            marginTop: "140px",
          }}
        >
          <p
            className="subtitle1 trainingDeliveryPrincipleTitle"
            style={{
              display: "flex",
              alignItems: "center",
              color: "#FFFFFF",
              height: "39px",
              justifyContent: "center",
              backgroundColor: "#3b3a4a",
              borderRadius: "10px",
              paddingBottom: "5px",
              marginBottom: "5px"
            }}
          >
            Training delivery principle
          </p>

          <ReactQuill
            theme="snow"
            style={{
              width: "100%",
              height: "600px",
              backgroundColor: "#FFFFFF",
              // borderRadius: "10px",
            }}
            className="ql-container-training-delivery-principle"
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
