import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import React from "react";

const props = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const SyllabusPopup = ({
  dayNumber,
  unitNumber,
  unitName,
  onClose,
}) => {
  return (
    <div className="syllabusPopup">
      <h2>Syllabus Information</h2>
      <div className="dayName">
        <p>Day: {dayNumber}</p>
      </div>
      <div className="unitInfor" style={{ display: "flex" }}>
        <p>Unit: {unitNumber}</p>
        <p>Unit Name: {unitName}</p>
      </div>
      <div className="uploadFile">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SyllabusPopup;
