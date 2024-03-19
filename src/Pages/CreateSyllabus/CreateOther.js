import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import TimeAllocation from "../../Components/Common/TimeAllocation/TimeAllocation";
import { Input, Select, message } from "antd";
import { Option } from "antd/es/mentions";
import { useSelector } from "react-redux";

const CreateOther = () => {
  const [trainingDeliveryPrinciple, setTrainingDeliveryPrinciple] = useState("");
  const [quizWeight, setQuizWeight] = useState("");
  const [assignmentWeight, setAssignmentWeight] = useState("");
  const [finalWeight, setFinalWeight] = useState("");
  const [finalTheoryWeight, setFinalTheoryWeight] = useState("");
  const [finalPracticeWeight, setFinalPracticeWeight] = useState("");
  const [gpaWeight, setGpaWeight] = useState("");
  const [totalWeight, setTotalWeight] = useState(0);
  const outline = useSelector((state) => state.outline.days);


  const weights = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);

  const passingCriteria = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

  const convertPercentToNumber = (percentString) => {
    return parseInt(percentString.replace("%", ""), 10);
  };

  const handleSaveWeights = () => {
    const quizPercent = convertPercentToNumber(quizWeight);
    const assignmentPercent = convertPercentToNumber(assignmentWeight);
    const finalPercent = convertPercentToNumber(finalWeight);
    const totalPercent = quizPercent + assignmentPercent + finalPercent;

    if (totalPercent !== 100) {
      message.error("Tổng phần trăm phải đúng là 100.");
      setTotalWeight(0);
    } else {
      message.success("Lưu trọng số thành công.");
      setTotalWeight(totalPercent);
    }
  };

  useEffect(() => {
    if (quizWeight && assignmentWeight && finalWeight) {
      handleSaveWeights();
    }
  }, [quizWeight, assignmentWeight, finalWeight]);

  const handleSaveFinalWeights = () => {
    const finalTheoryPercent = convertPercentToNumber(finalTheoryWeight);
    const finalPracticePercent = convertPercentToNumber(finalPracticeWeight);
    const totalPercent = finalTheoryPercent + finalPracticePercent;

    if (totalPercent !== 100) {
      message.error("Tổng phần trăm của Final Theory và Final Practice phải đúng là 100.");
    } else {
      message.success("Lưu trọng số của Final Theory và Final Practice thành công.");
    }
  };

  useEffect(() => {
    if (finalTheoryWeight && finalPracticeWeight) {
      handleSaveFinalWeights();
    }
  }, [finalTheoryWeight, finalPracticeWeight]);

  const displayWeights = () => {

    let assignmentLabCount = 0;
    let testQuizCount = 0;

    outline.forEach((day) => {
      day.units.forEach((unit) => {
        unit.syllabus.forEach((syllabus) => {
          if (syllabus.type === "Assignment/Lab") {
            assignmentLabCount++;
          } else if (syllabus.type === "Test/Quiz") {
            testQuizCount++;
          }
        });
      });
    });

    console.log([
      { title: "Quiz", weight: parseInt(quizWeight, 10), numberOfTaskPassingCriteria: testQuizCount },
      { title: "Assignment", weight: parseInt(assignmentWeight, 10), numberOfTaskPassingCriteria: assignmentLabCount },
      { title: "Final", weight: parseInt(finalWeight, 10), numberOfTaskPassingCriteria: 2 },
      { title: "Final Theory", weight: parseInt(finalTheoryWeight, 10), numberOfTaskPassingCriteria: 1 },
      { title: "Final Practice", weight: parseInt(finalPracticeWeight, 10), numberOfTaskPassingCriteria: 1 },
      { title: "GPA", weight: parseInt(gpaWeight, 10), numberOfTaskPassingCriteria: 1 },
    ]);
  };

  useEffect(() => {
    if (
      quizWeight &&
      assignmentWeight &&
      finalWeight &&
      finalTheoryWeight &&
      finalPracticeWeight &&
      gpaWeight
    ) {
      displayWeights();
    }
  }, [
    quizWeight,
    assignmentWeight,
    finalWeight,
    finalTheoryWeight,
    finalPracticeWeight,
    gpaWeight
  ]);

  return (
    <div className="syllabusOtherTabContainer" style={{ width: "98%" }}>
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
                <div className="quizInpt assessmentInput">
                  <Select
                    style={{ width: "100%" }}
                    value={quizWeight}
                    onChange={(value) => setQuizWeight(value)}
                  >
                    {weights.map((weight, index) => (
                      <Option key={index} value={`${weight}%`}>
                        {weight}%
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
                  <Select
                    style={{ width: "100%" }}
                    value={assignmentWeight}
                    onChange={(value) => setAssignmentWeight(value)}
                  >
                    {weights.map((weight, index) => (
                      <Option key={index} value={`${weight}%`}>
                        {weight}%
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
                  <Select
                    style={{ width: "100%" }}
                    value={finalWeight}
                    onChange={(value) => setFinalWeight(value)}
                  >
                    {weights.map((weight, index) => (
                      <Option key={index} value={`${weight}%`}>
                        {weight}%
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              {totalWeight === 100 && (
                <div className="finalIngredient ">
                  <div className="finalTheory assessmentWidth">
                    <div className="assessmentTitle">
                      <p className="body2">Final Theory*</p>
                    </div>
                    <div className="assessmentInput">
                      <Select
                        style={{ width: "100%" }}
                        value={finalTheoryWeight}
                        onChange={(value) => setFinalTheoryWeight(value)}
                      >
                        {weights.map((weight, index) => (
                          <Option key={index} value={`${weight}%`}>
                            {weight}%
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
                      <Select
                        style={{ width: "100%" }}
                        value={finalPracticeWeight}
                        onChange={(value) => setFinalPracticeWeight(value)}
                      >
                        {weights.map((weight, index) => (
                          <Option key={index} value={`${weight}%`}>
                            {weight}%
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              <div className="passingCriteria" style={{ marginTop: "10px" }}>
                <div
                  className="passingCriteriatitle"
                  style={{ marginBottom: "15px" }}
                >
                  <p className="subtitle2" style={{ color: "tomato", fontWeight: "700", fontSize: "16px" }}>Passing criteria</p>
                </div>
                <div className="assessmentWidth">
                  <div className="assessmentTitle">
                    <p className="body2">GPA *</p>
                  </div>
                  <div className="assessmentInput">
                    <Select
                      style={{ width: "100%" }}
                      value={gpaWeight}
                      onChange={(value) => setGpaWeight(value)}
                    >
                      {passingCriteria.map((weight, index) => (
                        <Option key={index} value={weight}>
                          {weight}%
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
