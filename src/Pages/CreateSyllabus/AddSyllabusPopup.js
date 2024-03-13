import React, { useState } from "react";
import { Switch, Input, Button, Select, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddSyllabusPopup = ({
  newSyllabusTitle,
  setNewSyllabusTitle,
  newSyllabusStandard,
  setNewSyllabusStandard,
  newSyllabusStatus,
  setNewSyllabusStatus,
  newSyllabusTime,
  setNewSyllabusTime,
  newSyllabusType,
  setNewSyllabusType,
  handleAddSyllabus,
  selectedDayIndex,
  selectedUnitIndex,
  setShowAddSyllabusPopup,
}) => {
  const isCreateDisabled =
    !newSyllabusTitle || !newSyllabusTime || !newSyllabusType;

  const [outputStandards, setOutputStandards] = useState([]);

  const deliveryTypeOptions = [
    "Assignment/Lab",
    "Concept/Lecture",
    "Guide/Review",
    "Test/Quiz",
    "Exam",
    "Workshop",
  ];

  const handleStandardChange = (e) => {
    if (e.key === "Enter") {
      const newStandard = e.target.value.trim();
      if (newStandard !== "") {
        setOutputStandards([...outputStandards, newStandard]);
        setNewSyllabusStandard(newStandard);
        setNewSyllabusStandard("");
      }
    }
  };

  const handleRemoveTag = (removedTag) => {
    const newTags = outputStandards.filter((tag) => tag !== removedTag);
    setOutputStandards(newTags);
  };

  const handleTrainingTimeChange = (e) => {
    const newValue = e.target.value.replace(/\D/, "");
    setNewSyllabusTime(newValue);
  };

  return (
    <div className="syllabusPopup">
      <h4 style={{ margin: "0", padding: "20px 0", textAlign: "center" }}>
        Create Syllabus
      </h4>
      <div className="syllabusContent"></div>

      <div
        className="syllabusName"
        style={{ width: "340px", marginBottom: "10px" }}
      >
        <Input
          placeholder="Name"
          value={newSyllabusTitle}
          onChange={(e) => setNewSyllabusTitle(e.target.value)}
        />
      </div>

      <div className="syllabusStandard" style={{ marginBottom: "10px" }}>
        <Input
          placeholder="Output Standard"
          value={newSyllabusStandard}
          onChange={(e) => setNewSyllabusStandard(e.target.value)}
          onKeyDown={handleStandardChange}
        />
        <div style={{ marginTop: "5px" }}>
          {outputStandards.map((tag, index) => (
            <Tag key={index} closable onClose={() => handleRemoveTag(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className="syllabusTime" style={{ marginBottom: "10px" }}>
        <Input
          prefix={<ClockCircleOutlined />}
          placeholder="Training time"
          value={newSyllabusTime}
          onChange={(e) => setNewSyllabusTime(e.target.value)}
        />
      </div>

      <div
        className="syllabusType"
        style={{ width: "184px", marginBottom: "10px" }}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Delivery type"
          value={newSyllabusType}
          onChange={(value) => setNewSyllabusType(value)}
        >
          {deliveryTypeOptions.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </div>

      <div className="syllabusStatus" style={{ marginBottom: "10px" }}>
        <Switch
          checkedChildren="Online"
          unCheckedChildren="Offline"
          checked={newSyllabusStatus}
          onChange={(checked) => setNewSyllabusStatus(checked)}
        />
      </div>

      <div className="syllabusAction" style={{ marginBottom: "10px" }}>
        <Button
          type="primary"
          onClick={() => handleAddSyllabus(selectedDayIndex, selectedUnitIndex)}
          disabled={isCreateDisabled}
          style={{ marginRight: "10px" }}
        >
          Create
        </Button>
        <Button onClick={() => setShowAddSyllabusPopup(false)}>Cancel</Button>
      </div>
    </div>
  );
};

export default AddSyllabusPopup;
