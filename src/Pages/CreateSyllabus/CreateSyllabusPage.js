import React, { useState } from "react";
import "./CreateSyllabusPage.scss";
import { Button, Steps, message, theme } from "antd";
import CreateGeneral from "./CreateGeneral";
import CreateSyllabusHeader from "./CreateSyllabusHeader";
import CreateOutline from "./CreateOutline";
import Syllabus from "../../Components/Common/SyllabusTab/syllabus/syllabus";
import SyllabusDetail from "../../Components/Common/SyllabusDetail";
import CreateOther from "./CreateOther";

const steps = [
  {
    title: "General",
    content: <CreateGeneral />,
  },
  {
    title: "Outline",
    content: <CreateOutline />,
  },
  {
    title: "Others",
    content: <CreateOther />,
  },
];

const CreateSyllabusPage = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    innerHeight: "636px",
    // textAlign: "center",
    // color: token.colorTextTertiary,
    backgroundColor: "#FFFFFF",
    borderRadius: token.borderRadiusLG,
    // border: `1px solid ${token.colorBorder}`,
    marginTop: 0,
  };
  return (
    <div className="container">
      <h4 style={{ padding: "20px", margin: "0" }}>Syllabus</h4>
      <div className="create-syllabus-content">
        <Steps
          size="small"
          current={current}
          items={items}
          style={{
            width: "97%",
            paddingBottom: "20px",
            marginLeft: "20px",
            borderBottom: "1px solid black",
            display: "flex",
            alignItems: "center",
          }}
        />
        <CreateSyllabusHeader />

        <div className="syllabus_tab" style={{ marginLeft: "21px" }}>
          <div className="syllabus_tab_button" style={{ display: "flex" }}>
            {current < steps.length - 1 && (
              <Syllabus name={"General"} onClick={() => setCurrent(0)} />
            )}
            {current < steps.length - 1 && (
              <Syllabus name={"Outline"} onClick={() => setCurrent(1)} />
            )}
            {current < steps.length - 1 && (
              <Syllabus name={"Other"} onClick={() => setCurrent(2)} />
            )}
          </div>
        </div>

        <div style={contentStyle}>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Save
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateSyllabusPage;
