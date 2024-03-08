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
    "lab",
    "lecture",
    "review",
    "quiz",
    "exam",
    "workshop",
  ];

  return (
    <div className="syllabusPopup">
      <h2>Create Syllabus</h2>
      <div className="syllabusContent"></div>

      <div className="syllabusName">
        <Input
          placeholder="Name"
          value={newSyllabusTitle}
          onChange={(e) => setNewSyllabusTitle(e.target.value)}
        />
      </div>

      <div className="syllabusStandard">
        <Input
          placeholder="Output Standard"
          value={newSyllabusStandard}
          onChange={(e) => setNewSyllabusStandard(e.target.value)}
        />
      </div>

      <div className="syllabusTime">
        <Input
          placeholder="Training time"
          value={newSyllabusTime}
          onChange={(e) => setNewSyllabusTime(e.target.value)}
        />
      </div>

      <div className="syllabusType">
        <Select
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

      <div className="syllabusStatus">
        <Switch
          checkedChildren="Online"
          unCheckedChildren="Offline"
          checked={newSyllabusStatus}
          onChange={(checked) => setNewSyllabusStatus(checked)}
        />
      </div>

      <div className="syllabusAction">
        <Button
          type="primary"
          onClick={() => handleAddSyllabus(selectedDayIndex, selectedUnitIndex)}
          disabled={isCreateDisabled}
        >
          Create
        </Button>
        <Button onClick={() => setShowAddSyllabusPopup(false)}>Cancel</Button>
      </div>
    </div>
  );
};

export default AddSyllabusPopup;
