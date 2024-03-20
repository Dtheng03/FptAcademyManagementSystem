import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./SyllabusOrder.module.scss";
import { TimeAllocation } from "../SyllabusOutline/TimeAllocation/TimeAllocation";
import { VerifiedUserIcon } from "../../../Components/Common/Icons/IndicatorIcons";
import axios from "axios";
import { useEffect } from "react";

const cx = classNames.bind(style);

export default function Order({ id }) {
  return (
    <div className={cx("order")}>
      <div className={cx("haft-top-body")}>
        <TimeAllocationChart />
        <GradeReport id={id} />
      </div>
      <div className={cx("haft-bottom-body")}>
        <TrainingDeliveryPrinciple id={id} />
      </div>
    </div>
  );
}

function TimeAllocationChart() {
  const [isButtonClicked3, setIsButtonClicked3] = useState(false);
  const [popupOpen3, setPopupOpen3] = useState(false);

  const handleButtonClick3 = () => {
    setIsButtonClicked3(!isButtonClicked3); // Toggle button clicked state
    setPopupOpen3(!popupOpen3); // Toggle popup open/close
  };

  const data = [
    { label: "Assignment/Lab", percent: 54, color: "#F4BE37" },
    { label: "Concept/Lecture", percent: 29, color: "#FF9F40" },
    { label: "Guide/Review", percent: 9, color: "#0D2535" },
    { label: "Test/Quiz", percent: 1, color: "#5388D8" },
    { label: "Exam", percent: 6, color: "#206EE5" },
  ];

  const width = 200;
  const height = 200;

  return (
    <div className={cx("time-allocation")}>
      <div className={cx("dropdown3")}>
        <button
          className={cx("dropdown-button3", { clicked: isButtonClicked3 })}
          onClick={handleButtonClick3}
        >
          <p>Time allocation</p>
        </button>
        {isButtonClicked3 && (
          <div className={cx("dropdown-content3", { opened: popupOpen3 })}>
            <div className={cx("dropdown-option1")}>
              <TimeAllocation data={data} width={width} height={height} />
              <div className={cx("dropdown-content1")}>
                <div className={cx("form-view-mini")}>
                  <div
                    style={{
                      width: "6.96px", // Set the width and height to create a circle
                      height: "6.96px",
                      borderRadius: "50%", // Set border-radius to 50% to create a circle
                      backgroundColor: "#F4BE37", // Set background color to yellow
                    }}
                  ></div>
                  <p>Assignment/Lab</p>
                </div>
                <div className={cx("form-view-mini")}>
                  <div
                    style={{
                      width: "6.96px", // Set the width and height to create a circle
                      height: "6.96px",
                      borderRadius: "50%", // Set border-radius to 50% to create a circle
                      backgroundColor: "#FF9F40", // Set background color to yellow
                    }}
                  ></div>
                  <p>Concept/Lecture</p>
                </div>
                <div className={cx("form-view-mini")}>
                  <div
                    style={{
                      width: "6.96px", // Set the width and height to create a circle
                      height: "6.96px",
                      borderRadius: "50%", // Set border-radius to 50% to create a circle
                      backgroundColor: "#0D2535", // Set background color to yellow
                    }}
                  ></div>
                  <p>Guide/Review</p>
                </div>
                <div className={cx("form-view-mini")}>
                  <div
                    style={{
                      width: "6.96px", // Set the width and height to create a circle
                      height: "6.96px",
                      borderRadius: "50%", // Set border-radius to 50% to create a circle
                      backgroundColor: "#5388D8", // Set background color to yellow
                    }}
                  ></div>
                  <p>Test/Quiz</p>
                </div>
                <div className={cx("form-view-mini")}>
                  <div
                    style={{
                      width: "6.96px", // Set the width and height to create a circle
                      height: "6.96px",
                      borderRadius: "50%", // Set border-radius to 50% to create a circle
                      backgroundColor: "#206EE5", // Set background color to yellow
                    }}
                  ></div>
                  <p>Exam</p>
                </div>
              </div>
              <div className={cx("gradePoint")}>
                <p>(54%)</p>
                <p>(29%)</p>
                <p>(9%)</p>
                <p>(1%)</p>
                <p>(6%)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GradeReport({ id }) {
  const [isButtonClicked4, setIsButtonClicked4] = useState(false);
  const [popupOpen4, setPopupOpen4] = useState(false);

  const handleButtonClick4 = () => {
    setIsButtonClicked4(!isButtonClicked4); // Toggle button clicked state
    setPopupOpen4(!popupOpen4); // Toggle popup open/close
  };

  const [data, setData] = useState({});
  const finalTheoryWeight =
    data.data &&
    data.data.assessmentSchemes.find(
      (scheme) => scheme.title === "Final Theory Test"
    ).weight;
  const finalPracticeWeight =
    data.data &&
    data.data.assessmentSchemes.find(
      (scheme) => scheme.title === "Final Practice Test"
    ).weight;
  const finalTotalWeight = finalTheoryWeight + finalPracticeWeight;

  useEffect(() => {
    if (!id) return;

    axios
      .get(
        `http://fams-group1-net03.ptbiology.com/api/syllabus/view-details-syllabus?syllabusId=${id}`
      )
      .then((response) => {
        // Handle successful response
        console.log("Response from API:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <div className={cx("grade-report")}>
      <div className={cx("dropdown4")}>
        <button
          className={cx("dropdown-button4", { clicked: isButtonClicked4 })}
          onClick={handleButtonClick4}
        >
          <p>Grade report</p>
        </button>
        {isButtonClicked4 && (
          <div className={cx("dropdown-content4", { opened: popupOpen4 })}>
            <div className={cx("dropdown-option1")}>
              <div className={cx("dropdown-option1-content")}>
                <div className={cx("mini-content")}>
                  <p>
                    Quiz :{" "}
                    {data.data &&
                      data.data.assessmentSchemes.find(
                        (scheme) => scheme.title === "Quiz"
                      ).weight}
                    %
                  </p>
                  <p>
                    Assignment :{" "}
                    {data.data &&
                      data.data.assessmentSchemes.find(
                        (scheme) => scheme.title === "Assignments"
                      ).weight}
                    %
                  </p>
                </div>
                <div className={cx("mini-content2")}>
                  <p>Final : {finalTotalWeight}%</p>
                </div>
              </div>
              <div className={cx("dropdown-option1-content2")}>
                <p>Passing criteria</p>
                <p>
                  GPA *{" "}
                  {data.data &&
                    data.data.assessmentSchemes.find(
                      (scheme) => scheme.title === "Pass Criteria"
                    ).weight}
                  %
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TrainingDeliveryPrinciple({ id }) {
  const [isButtonClicked5, setIsButtonClicked5] = useState(false);
  const [popupOpen5, setPopupOpen5] = useState(false);

  const handleButtonClick5 = () => {
    setIsButtonClicked5(!isButtonClicked5); // Toggle button clicked state
    setPopupOpen5(!popupOpen5); // Toggle popup open/close
  };

  const [data, setData] = useState({});

  useEffect(() => {
    if (!id) return;

    axios
      .get(
        `http://fams-group1-net03.ptbiology.com/api/syllabus/view-details-syllabus?syllabusId=${id}`
      )
      .then((response) => {
        // Handle successful response
        console.log("Response from API:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <div className={cx("training-delivery-principle")}>
      <div className={cx("dropdown5")}>
        <button
          className={cx("dropdown-button5", { clicked: isButtonClicked5 })}
          onClick={handleButtonClick5}
        >
          <p>Training delivery principle</p>
        </button>
        {isButtonClicked5 && (
          <div className={cx("dropdown-content5", { opened: popupOpen5 })}>
            <div className={cx("dropdown-option1")}>
              <div className={cx("content-container")}>
                <div className={cx("container")}>
                  <div className={cx("title-content-name")}>
                    <VerifiedUserIcon />
                    <p>Training</p>
                  </div>
                  <ul>
                    <li>
                      {data.data.trainingPrinciple
                        .split("\n")
                        .map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </li>
                  </ul>
                </div>

                <div className={cx("container")}>
                  <div className={cx("title-content-name")}>
                    <VerifiedUserIcon />
                    <p>Re-test</p>
                  </div>
                  <ul>
                    <li>
                      Only allow each student to retake the test up to 2 times
                    </li>
                    <li>Re-exam the same structure as the Final Test</li>
                  </ul>
                </div>

                <div className={cx("container")}>
                  <div className={cx("title-content-name")}>
                    <VerifiedUserIcon />
                    <p>Marking</p>
                  </div>
                  <ul>
                    <li>Mentor review students on 2 Assignments</li>
                    <li>Mentor marks the 3 Quizzes and Final Exam Theory</li>
                    <li>Trainer marks the Final Exam Practice</li>
                    <li>
                      If the trainees have to retake test, the score will be
                      calculated:
                    </li>
                    <ul>
                      <li>The score {">"}= 6, the score will be 6</li>
                      <li>The score {"<"}6, the score will be that score</li>
                    </ul>
                  </ul>
                </div>

                <div className={cx("container")}>
                  <div className={cx("title-content-name")}>
                    <VerifiedUserIcon />
                    <p>Waiver Criteria</p>
                  </div>
                  <ul>
                    <li>Students pass the quick test</li>
                    <li>Trainer Audit: rank B</li>
                  </ul>
                </div>

                <div className={cx("container")}>
                  <div className={cx("title-content-name")}>
                    <VerifiedUserIcon />
                    <p>Training</p>
                  </div>
                  <p className={cx("text-paragraph")}>
                    Trainers can allow students to complete homework and submit
                    the next day
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
