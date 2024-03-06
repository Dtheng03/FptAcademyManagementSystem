import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDay, addUnit, addSyllabus } from "../../Redux/Reducer/outlineSlice";
import TimeAllocation from "../../Components/Common/TimeAllocation/TimeAllocation";
import SyllabusDetail from "../../Components/Common/SyllabusDetail";
import Button from "../../Components/Common/Button";
import { Switch } from "antd";

const CreateOutline = () => {
  const dispatch = useDispatch();
  const outline = useSelector((state) => state.outline);
  const [isDayContentVisible, setIsDayContentVisible] = useState(true);
  const [showAddSyllabusPopup, setShowAddSyllabusPopup] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(null);
  const [newSyllabusTitle, setNewSyllabusTitle] = useState("");
  const [newSyllabusStandard, setNewSyllabusStandard] = useState("");
  const [newSyllabusStatus, setNewSyllabusStatus] = useState(true);
  const [newSyllabusTime, setNewSyllabusTime] = useState("");
  const [newSyllabusType, setNewSyllabusType] = useState("");

  // const [outlineDays, setOutlineDays] = useState([
  //   {
  //     dayNumber: 1,
  //     units: [
  //       {
  //         unitNumber: 1,
  //         unitName: ".NET Introduction",
  //         syllabus: [
  //           {
  //             title: ".NET Introduction",
  //             standard: "H4SD",
  //             status: "online",
  //             time: "30",
  //             type: "lecture",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);

  const toggleDayContent = () => {
    setIsDayContentVisible(!isDayContentVisible);
  };

  const handleAddDay = () => {
    dispatch(
      addDay({
        dayNumber: outline.length + 1,
        units: [],
      })
    );
  };

  const handleAddUnit = (dayIndex) => {
    const newUnitNumber = outline[dayIndex].units.length + 1;
    const newUnit = {
      unitNumber: newUnitNumber,
      unitName: "",
      syllabus: [],
    };
    dispatch(addUnit({ dayIndex, unit: newUnit }));
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

  const openAddSyllabusPopup = (dayIndex, unitIndex) => {
    setShowAddSyllabusPopup(true);
    setSelectedDayIndex(dayIndex);
    setSelectedUnitIndex(unitIndex);
  };

  return (
    <div className="syllabusTabContainer" style={{ padding: "0" }}>
      <div className="syllabusTabContent">
        <div
          className="createOutline"
          style={{ width: "100%", height: "100%" }}
        >
          <div className="outlineDays" style={{ width: "100%", height: "90%" }}>
            {outline.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="outlineDay"
                style={{
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
                  onClick={toggleDayContent}
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
                    <button>remove</button>
                  </div>
                </div>

                <div
                  className="dayContent"
                  style={{
                    width: "100%",
                    height: isDayContentVisible ? "auto" : "0",
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
                          paddingBottom: "40px",
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
                                    7 hrs
                                  </p>
                                </div>
                              </div>

                              <div className="unitEditBtn">
                                <button>Edit</button>
                              </div>
                            </div>
                            <div className="unitDropDownBtn">
                              <button className="dropDownBtn">v</button>
                            </div>
                          </div>

                          <div className="syllabusDetails">
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
                                onClick={() =>
                                  openAddSyllabusPopup(dayIndex, unitIndex)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="popup-create-dayUnit"
                        style={{
                          padding: "20px",
                          borderBottom: "1px solid #adadad",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div className="create-unitNumber">
                          <p className="subtitle1">Unit 2</p>
                        </div>
                        <div
                          className="create-unitLable"
                          style={{
                            width: "100%",
                            height: "46px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div className="create-InputUnitName">
                            <input
                              className="InputUnitName"
                              type="text"
                              placeholder="Unit name"
                            />
                          </div>
                          <div className="create-createUnitBtn">
                            <Button title={"Create"} />
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
        <div className="syllabusPopup">
          <h2>Create Syllabus</h2>
          <input
            type="text"
            placeholder="Title"
            value={newSyllabusTitle}
            onChange={(e) => setNewSyllabusTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Standard"
            value={newSyllabusStandard}
            onChange={(e) => setNewSyllabusStandard(e.target.value)}
          />

          <Switch
            checkedChildren="Online"
            unCheckedChildren="Offline"
            checked={newSyllabusStatus}
            onChange={(checked) => setNewSyllabusStatus(checked)}
          />
          <input
            type="text"
            placeholder="Time"
            value={newSyllabusTime}
            onChange={(e) => setNewSyllabusTime(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type"
            value={newSyllabusType}
            onChange={(e) => setNewSyllabusType(e.target.value)}
          />
          <button
            onClick={() =>
              handleAddSyllabus(selectedDayIndex, selectedUnitIndex)
            }
          >
            Create
          </button>
          <button onClick={() => setShowAddSyllabusPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CreateOutline;
