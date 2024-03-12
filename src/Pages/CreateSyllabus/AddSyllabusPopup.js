import React from "react";
import { Switch, Input, Button, Select } from "antd";

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
    !newSyllabusTitle ||
    !newSyllabusStandard ||
    !newSyllabusTime ||
    !newSyllabusType;

  const deliveryTypeOptions = [
    "assignment",
    "lecture",
    "review",
    "quiz",
    "exam",
    "workshop",
  ];

  return (
    <div className="syllabusPopup">
      <h4 style={{ margin: "0", padding: "20px 0", textAlign: "center" }}>
        Create Syllabus
      </h4>
      <div className="syllabusContent"></div>

      <div className="syllabusName" style={{ width: "340px", marginBottom: "10px" }}>
        <Input
          placeholder="Name"
          value={newSyllabusTitle}
          onChange={(e) => setNewSyllabusTitle(e.target.value)}
        />
      </div>

      <div className="syllabusStandard" style={{marginBottom: "10px"}}>
        <Input
          placeholder="Output Standard"
          value={newSyllabusStandard}
          onChange={(e) => setNewSyllabusStandard(e.target.value)}
        />
      </div>

      <div className="syllabusTime" style={{marginBottom: "10px"}}>
        <Input
          placeholder="Training time"
          value={newSyllabusTime}
          onChange={(e) => setNewSyllabusTime(e.target.value)}
        />
      </div>

      <div className="syllabusType" style={{ width: "124px", marginBottom: "10px" }}>
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

      <div className="syllabusStatus" style={{marginBottom: "10px"}}>
        <Switch
          checkedChildren="Online"
          unCheckedChildren="Offline"
          checked={newSyllabusStatus}
          onChange={(checked) => setNewSyllabusStatus(checked)}
        />
      </div>

      <div className="syllabusAction" style={{marginBottom: "10px"}}>
        <Button
          type="primary"
          onClick={() => handleAddSyllabus(selectedDayIndex, selectedUnitIndex)}
          disabled={isCreateDisabled}
          style={{marginRight: "10px"}}
        >
          Create
        </Button>
        <Button onClick={() => setShowAddSyllabusPopup(false)}>Cancel</Button>
      </div>
    </div>
  );
};

export default AddSyllabusPopup;
