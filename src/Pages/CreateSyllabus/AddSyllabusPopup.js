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

  const [outputStandards, setOutputStandards] = useState({});
  const [selectedStandardOption, setSelectedStandardOption] = useState(null);

  const deliveryTypeOptions = [
    "Assignment/Lab",
    "Concept/Lecture",
    "Guide/Review",
    "Test/Quiz",
    "Exam",
    "Workshop",
  ];

  const standardOptions = ["LO001", "LO002", "LO003"];

  const handleStandardChange = (value) => {
    setNewSyllabusStandard(value);
    setSelectedStandardOption(value);
    if (!outputStandards[value]) {
      setOutputStandards({
        ...outputStandards,
        [value]: [value],
      });
    }
  };

  // const handleRemoveTag = (tagToRemove) => {
  //   const updatedTags = { ...outputStandards };
  //   const currentStandardOptions = updatedTags[selectedStandardOption] || [];
  //   const filteredOptions = currentStandardOptions.filter((tag) => tag !== tagToRemove);
  //   updatedTags[selectedStandardOption] = filteredOptions;
  //   setOutputStandards(updatedTags);
  // };



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
        <Select
          placeholder="Output Standard"
          value={newSyllabusStandard}
          onChange={handleStandardChange}
          style={{ width: "100%" }}
        >
          {standardOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        {/* <div style={{ marginTop: "5px" }}>
          {outputStandards[selectedStandardOption]?.map((tag, index) => (
            <Tag key={index} closable onClose={() => handleRemoveTag(tag)}>
              {tag}
            </Tag>
          ))}
        </div> */}
      </div>

      <div className="syllabusTime" style={{ marginBottom: "10px" }}>
        <Input
          prefix={<ClockCircleOutlined />}
          type="number"
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
