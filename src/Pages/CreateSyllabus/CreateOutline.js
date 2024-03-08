import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDay,
  addUnit,
  addSyllabus,
  removeDay,
} from "../../Redux/Reducer/outlineSlice";
import TimeAllocation from "../../Components/Common/TimeAllocation/TimeAllocation";
import SyllabusDetail from "../../Components/Common/SyllabusDetail";
import Button from "../../Components/Common/Button";
import AddSyllabusPopup from "./AddSyllabusPopup";
import * as ActionIcons from "../../Components/Common/Icons/ActionIcons";
import * as DocManageIcons from "../../Components/Common/Icons/DocManageIcons";
import {
  DownCircleOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AddUnitPopup from "./AddUnitPopup";

const CreateOutline = () => {
  const dispatch = useDispatch();
  const outline = useSelector((state) => state.outline);
  const [showAddSyllabusPopup, setShowAddSyllabusPopup] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(null);
  const [newSyllabusTitle, setNewSyllabusTitle] = useState("");
  const [newSyllabusStandard, setNewSyllabusStandard] = useState("");
  const [newSyllabusStatus, setNewSyllabusStatus] = useState(true);
  const [newSyllabusTime, setNewSyllabusTime] = useState("");
  const [newSyllabusType, setNewSyllabusType] = useState("");
  const [newUnitName, setNewUnitName] = useState("");
  const [showAddUnitPopup, setShowAddUnitPopup] = useState(false);
  const [dayCounter, setDayCounter] = useState(outline.length + 1);

  const [dayContentVisibility, setDayContentVisibility] = useState(
    outline.map(() => true)
  );

  const [unitSyllabusVisibility, setUnitSyllabusVisibility] = useState(
    outline.map(() => true)
  );

  const toggleDayContent = (dayIndex) => {
    const newVisibility = [...dayContentVisibility];
    newVisibility[dayIndex] = !newVisibility[dayIndex];

    setDayContentVisibility(newVisibility);
  };

  const toggleSyllabusDetails = (dayIndex, unitIndex) => {
    const newVisibility = [...unitSyllabusVisibility];
    newVisibility[unitIndex] = !newVisibility[unitIndex];
    setUnitSyllabusVisibility(newVisibility);
  };

  const handleAddDay = () => {
    dispatch(
      addDay({
        dayNumber: dayCounter,
        units: [],
      })
    );
    setDayCounter((prevCounter) => prevCounter + 1);
  };

  const handleAddUnit = (dayIndex) => {
    setSelectedDayIndex(dayIndex);
    setSelectedUnitIndex(null);

    setShowAddUnitPopup(true);
  };

  const handleCreateUnit = () => {
    if (selectedDayIndex !== null) {
      const newUnitNumber = outline[selectedDayIndex].units.length + 1;
      const newUnit = {
        unitNumber: newUnitNumber,
        unitName: newUnitName,
        syllabus: [],
      };

      dispatch(addUnit({ dayIndex: selectedDayIndex, unit: newUnit }));

      setNewUnitName("");
      setShowAddUnitPopup(false);
    }
  };

  const handleAddSyllabus = (dayIndex, unitIndex) => {
    const newSyllabus = {
      title: newSyllabusTitle,
      standard: newSyllabusStandard,
      status: newSyllabusStatus,
      time: newSyllabusTime,
      type: newSyllabusType,
    };
    console.log("New Syllabus:", newSyllabus);

    dispatch(addSyllabus({ dayIndex, unitIndex, syllabus: newSyllabus }));

    setNewSyllabusTitle("");
    setNewSyllabusStandard("");
    setNewSyllabusStatus(false);
    setNewSyllabusTime("");
    setNewSyllabusType("");

    setShowAddSyllabusPopup(false);
  };

  const handleRemoveDay = (dayIndex) => {
    dispatch(removeDay(dayIndex));
  };

  const openAddSyllabusPopup = (dayIndex, unitIndex) => {
    setShowAddSyllabusPopup(true);
    setSelectedDayIndex(dayIndex);
    setSelectedUnitIndex(unitIndex);
  };

  const calculateTotalTrainingTime = (dayIndex, unitIndex) => {
    let totalMinutes = 0;

    const day = outline[dayIndex];

    if (day && day.units[unitIndex] && day.units[unitIndex].syllabus) {
      day.units[unitIndex].syllabus.forEach((syllabus) => {
        if (syllabus.time && syllabus.time.trim() !== "") {
          const minutes = parseInt(syllabus.time, 10) || 0;
          totalMinutes += minutes;
        }
      });
    }

    return totalMinutes;
  };

  const renderTotalTrainingTime = (dayIndex, unitIndex) => {
    const totalMinutes = calculateTotalTrainingTime(dayIndex, unitIndex);

    const hours = Math.floor(totalMinutes / 60);
    const displayHour = hours === 1 ? `${hours} hr` : `${hours} hrs`;
    const minutes = totalMinutes % 60;
    const displayMinute = minutes === 1 ? `${minutes} min` : `${minutes} mins`;


    return `${displayHour}  ${displayMinute}`;
  };

  return (
    <div className="syllabusTabContainer" style={{ padding: "0" }}>
      <div className="syllabusTabContent">
        <div
          className="createOutline"
          style={{ width: "100%", height: "100%" }}
        >
          <div
            className="outlineDays"
            style={{ width: "100%", maxHeight: "100%", overflowY: "auto" }}
          >
            {outline.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="outlineDay"
                style={{
                  margin: "1px 0",
                  width: "100%",
                  height: "auto",
                }}
              >
                <div
                  className="dayLabel"
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "44px",
                    alignItems: "center",
                  }}
                  onClick={() => toggleDayContent(dayIndex)}
                >
                  <div
                    className="dayNumber subtitle1"
                    style={{ color: "#FFFFFF" }}
                  >
                    <p style={{ paddingLeft: "20px", marginRight: "34px" }}>
                      Day {day.dayNumber}
                    </p>
                  </div>
                  <div className="removeDayBtn">
                    <button onClick={() => handleRemoveDay(dayIndex)}>
                      Remove
                    </button>
                  </div>
                </div>

                <div
                  className="dayContent"
                  style={{
                    width: "100%",
                    height: dayContentVisibility[dayIndex] ? "auto" : "0",
                    overflow: "hidden",
                    transition: "height 0.3s ease",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    borderBottomLeftRadius: "7px",
                    borderBottomRightRadius: "7px",
                  }}
                >
                  {day.units.map((unit, unitIndex) => (
                    <div
                      key={unitIndex}
                      className="dayUnits"
                      style={{ width: "100%", height: "auto" }}
                    >
                      <div
                        className="dayUnit"
                        style={{
                          width: "100%",
                          height: "auto",
                          padding: "20px",
                          paddingBottom: "20px",
                          borderBottom: "1px solid #adadad",
                        }}
                      >
                        <div className="unitNumber subtitle1">
                          <p>Unit {unit.unitNumber}</p>
                        </div>
                        <div className="dayUnitInfor">
                          <div
                            className="unitLable"
                            style={{
                              width: "100%",
                              height: "46px",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              className="unitHeader"
                              style={{ display: "flex" }}
                            >
                              <div className="unitInfor">
                                <div className="unitName subtitle1">
                                  <p>{unit.unitName}</p>
                                </div>
                                <div className="unitHour ">
                                  <p
                                    className="caption2"
                                    style={{
                                      fontStyle: "italic",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {renderTotalTrainingTime(
                                      dayIndex,
                                      unitIndex
                                    )}
                                  </p>
                                </div>
                              </div>

                              <div className="unitEditBtn">
                                <button>
                                  <EditOutlined />
                                </button>
                              </div>
                            </div>
                            <div className="unitDropDownBtn">
                              <button
                                className="dropDownBtn"
                                onClick={() =>
                                  toggleSyllabusDetails(dayIndex, unitIndex)
                                }
                              >
                                <DownCircleOutlined />
                              </button>
                            </div>
                          </div>

                          <div
                            className="syllabusDetails"
                            style={{
                              display: unitSyllabusVisibility[unitIndex]
                                ? "block"
                                : "none",
                            }}
                          >
                            {unit.syllabus.map(
                              (syllabusItem, syllabusIndex) => (
                                <div
                                  key={syllabusIndex}
                                  className="syllabusDetail"
                                >
                                  <SyllabusDetail {...syllabusItem} />
                                </div>
                              )
                            )}
                            <div className="addSyllabusBtn">
                              <button
                                style={{ padding: "0" }}
                                onClick={() =>
                                  openAddSyllabusPopup(dayIndex, unitIndex)
                                }
                              >
                                <PlusCircleOutlined />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="addUnitBtn">
                    <Button
                      onClick={() => handleAddUnit(dayIndex)}
                      firstIcon={"+"}
                      title={"Add Unit"}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="addDayBtn">
              <Button
                firstIcon={"+"}
                title={"Add Day"}
                onClick={handleAddDay}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="timeAllocation" style={{ width: "18%" }}>
        <TimeAllocation />
      </div>

      {showAddSyllabusPopup && (
        <>
          <div className="overlay">
            <AddSyllabusPopup
              newSyllabusTitle={newSyllabusTitle}
              setNewSyllabusTitle={setNewSyllabusTitle}
              newSyllabusStandard={newSyllabusStandard}
              setNewSyllabusStandard={setNewSyllabusStandard}
              newSyllabusStatus={newSyllabusStatus}
              setNewSyllabusStatus={setNewSyllabusStatus}
              newSyllabusTime={newSyllabusTime}
              setNewSyllabusTime={setNewSyllabusTime}
              newSyllabusType={newSyllabusType}
              setNewSyllabusType={setNewSyllabusType}
              handleAddSyllabus={handleAddSyllabus}
              selectedDayIndex={selectedDayIndex}
              selectedUnitIndex={selectedUnitIndex}
              setShowAddSyllabusPopup={setShowAddSyllabusPopup}
            />
          </div>
        </>
      )}

      {showAddUnitPopup && (
        <>
          <div className="overlay" />
          <AddUnitPopup
            newUnitName={newUnitName}
            setNewUnitName={setNewUnitName}
            handleCreateUnit={handleCreateUnit}
            setShowAddUnitPopup={setShowAddUnitPopup}
          />
        </>
      )}
    </div>
  );
};

export default CreateOutline;
