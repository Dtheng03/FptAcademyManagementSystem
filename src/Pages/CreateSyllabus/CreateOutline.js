import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDay,
  addUnit,
  addSyllabus,
  removeDay,
  updateUnitName,
  deleteUnit,
  calculateAndDisplaySyllabusTypePercentage,
} from "../../Redux/Reducer/outlineSlice";
import TimeAllocation from "../../Components/Common/TimeAllocation/TimeAllocation";
import SyllabusDetail from "../../Components/Common/SyllabusDetail";
import Button from "../../Components/Common/Button";
import AddSyllabusPopup from "./AddSyllabusPopup";

import {
  DeleteOutlined,
  DownCircleOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AddUnitPopup from "./AddUnitPopup";
import SyllabusPopup from "./SyllabusPopup";
import { Modal, Spin, message } from "antd";

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
  const [showSyllabusPopup, setShowSyllabusPopup] = useState(false);
  const [selectedSyllabusInfo, setSelectedSyllabusInfo] = useState(null);
  const [editingUnitName, setEditingUnitName] = useState(null);
  const [tempUnitName, setTempUnitName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSyllabusDetailClick = (dayIndex, unitIndex) => {
    const selectedDay = outline[dayIndex];
    const selectedUnit = selectedDay.units[unitIndex];
    const selectedSyllabus = selectedUnit.syllabus;

    setShowSyllabusPopup(true);
    setSelectedSyllabusInfo({
      dayNumber: selectedDay.dayNumber,
      unitNumber: selectedUnit.unitNumber,
      unitName: selectedUnit.unitName,
      syllabus: selectedSyllabus,
    });
  };

  const closeSyllabusPopup = () => {
    setShowSyllabusPopup(false);
    setSelectedSyllabusInfo(null);
  };

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

  const handleAddDay = async () => {
    try {
      setLoading(true);
      await dispatch(
        addDay({
          dayNumber: dayCounter,
          units: [],
        })
      );

      setDayCounter((prevCounter) => prevCounter + 1);
      setLoading(false);
      message.success("Day added successfully!");
    } catch (error) {
      console.error("Error add new day:", error);
      message.error(
        "An error occurred during add new day. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddUnit = (dayIndex) => {
    try {
      setSelectedDayIndex(dayIndex);
      setSelectedUnitIndex(null);
      setShowAddUnitPopup(true);
    } catch (error) {
      console.error("Error add new unit:", error);
      message.error(
        "An error occurred during add new unit. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUnit = async () => {
    try {
      if (selectedDayIndex !== null) {
        const newUnitNumber = outline[selectedDayIndex].units.length + 1;
        const newUnit = {
          unitNumber: newUnitNumber,
          unitName: newUnitName,
          syllabus: [],
        };

        setLoading(true);
        await dispatch(addUnit({ dayIndex: selectedDayIndex, unit: newUnit }));
        setNewUnitName("");
        setShowAddUnitPopup(false);

        setLoading(false);

        message.success("Unit added successfully!");
      }
    } catch (error) {
      console.error("Error create unit:", error);
      message.error(
        "An error occurred during create unit. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddSyllabus = (dayIndex, unitIndex) => {
    try {
      const newSyllabus = {
        title: newSyllabusTitle,
        standard: newSyllabusStandard,
        status: newSyllabusStatus,
        time: newSyllabusTime,
        type: newSyllabusType,
      };

      dispatch(addSyllabus({ dayIndex, unitIndex, syllabus: newSyllabus }));

      setNewSyllabusTitle("");
      setNewSyllabusStandard("");
      setNewSyllabusStatus(false);
      setNewSyllabusTime("");
      setNewSyllabusType("");

      setShowAddSyllabusPopup(false);

      dispatch(calculateAndDisplaySyllabusTypePercentage());
    } catch (error) {
      console.error("Error add syllabus:", error);
      message.error(
        "An error occurred during add syllabus. Please try again later."
      );
    }
  };

  const handleRemoveDay = (dayIndex) => {
    try {
      Modal.confirm({
        title: "Confirm Delete",
        content: "Are you sure you want to delete this day?",
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          await dispatch(removeDay(dayIndex));
          message.success("Day deleted successfully!");
        },
      });
    } catch (error) {
      console.error("Error remove day:", error);
      message.error(
        "An error occurred during remove day. Please try again later."
      );
    }
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

  const startEditingUnitName = (dayIndex, unitIndex) => {
    setEditingUnitName(unitIndex);
    setTempUnitName(outline[dayIndex].units[unitIndex].unitName);
  };

  const handleSaveUnitName = (dayIndex, unitIndex) => {
    dispatch(
      updateUnitName({ dayIndex, unitIndex, newUnitName: tempUnitName })
    );
    setEditingUnitName(null);
  };

  const handleCancelEditing = () => {
    setTempUnitName(null);
  };

  const handleDeleteUnit = (dayIndex, unitIndex) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this unit?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        await dispatch(deleteUnit({ dayIndex, unitIndex }));
        message.success("Unit deleted successfully!");
      },
    });
  };

  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : (
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
                        <button
                          style={{ background: "none" }}
                          onClick={() => handleRemoveDay(dayIndex)}
                        >
                          <DeleteOutlined />
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
                                    {editingUnitName === unitIndex ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          value={tempUnitName}
                                          onChange={(e) =>
                                            setTempUnitName(e.target.value)
                                          }
                                          autoFocus
                                        />
                                        <button
                                          onClick={() =>
                                            handleSaveUnitName(
                                              dayIndex,
                                              unitIndex
                                            )
                                          }
                                        >
                                          Save
                                        </button>
                                        <button onClick={handleCancelEditing}>
                                          Cancel
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="unitName subtitle1">
                                        <p>{unit.unitName}</p>
                                      </div>
                                    )}
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
                                    <button
                                      onClick={() =>
                                        startEditingUnitName(
                                          dayIndex,
                                          unitIndex
                                        )
                                      }
                                    >
                                      <EditOutlined />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteUnit(dayIndex, unitIndex)
                                      }
                                    >
                                      <DeleteOutlined />
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
                                    <DownCircleOutlined
                                      style={{
                                        transform: unitSyllabusVisibility[
                                          unitIndex
                                        ]
                                          ? "rotate(0deg)"
                                          : "rotate(90deg)",
                                        transition: "transform 0.3s ease",
                                      }}
                                    />
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
                                      onClick={() =>
                                        handleSyllabusDetailClick(
                                          dayIndex,
                                          unitIndex
                                        )
                                      }
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
          {showSyllabusPopup && (
            <>
              <div className="overlay" onClick={closeSyllabusPopup} />
              <SyllabusPopup
                {...selectedSyllabusInfo}
                onClose={closeSyllabusPopup}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CreateOutline;
