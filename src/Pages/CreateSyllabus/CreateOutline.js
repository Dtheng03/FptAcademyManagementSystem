import React from "react";
import TimeAllocation from "../../Components/Common/TimeAllocation/TimeAllocation";
import SyllabusDetail from "../../Components/Common/SyllabusDetail";
import Button from "../../Components/Common/Button";

const CreateOutline = () => {
  return (
    <div className="syllabusTabContainer" style={{ padding: "0" }}>
      <div className="syllabusTabContent">
        <div
          className="createOutline"
          style={{ width: "100%", height: "100%" }}
        >
          <div className="outlineDays" style={{ width: "100%", height: "90%" }}>
            <div
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
              >
                <div
                  className="dayNumber subtitle1"
                  style={{ color: "#FFFFFF"}}
                >
                  <p style={{ paddingLeft: "20px" , marginRight: "34px" }}>Day 1</p>
                </div>
                <div className="removeDayBtn">
                  <button>remove</button>
                </div>
              </div>

              <div
                className="dayContent"
                style={{
                  width: "100%",
                  height: "auto",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderBottomLeftRadius: "7px",
                  borderBottomRightRadius: "7px"
                }}
              >
                <div
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
                      <p>Unit 1</p>
                    </div>
                    <div className="dayUnitInfor">
                      <div
                        className="unitLable"
                        style={{
                          width: "100%",
                          height: "46px",
                          display: "flex",
                        }}
                      >
                        <div className="unitInfor">
                          <div className="unitName subtitle1">
                            <p>.NET Introduction</p>
                          </div>
                          <div className="unitHour ">
                            <p
                              className="caption2"
                              style={{ fontStyle: "italic", fontWeight: "400" }}
                            >
                              7 hrs
                            </p>
                          </div>
                        </div>

                        <div className="unitEditBtn">
                          <button>Edit</button>
                        </div>
                      </div>

                      <div className="syllabusDetails">
                        <div className="syllabusDetail">
                          <SyllabusDetail
                            title={".NET Introduction"}
                            standard={"H4SD"}
                            status={"online"}
                            time={"30"}
                            type={"lecture"}
                          />
                        </div>
                        <div className="syllabusDetail">
                          <SyllabusDetail
                            title={"Declaration & Assignment"}
                            standard={"H4SD"}
                            status={"online"}
                            time={"30"}
                            type={"lab"}
                          />
                        </div>
                        <div className="syllabusDetail">
                          <SyllabusDetail
                            title={"Logical Operators"}
                            standard={"H4SD"}
                            status={"offline"}
                            time={"30"}
                            type={"review"}
                          />
                        </div>
                        <div className="addSyllabusBtn">
                          <button>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="next-dayUnit"
                    style={{
                      padding: "20px",
                      borderBottom: "1px solid #adadad",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <div className="next-unitNumber">
                      <p className="subtitle1">Unit 2</p>
                    </div>
                    <div
                      className="next-unitLable"
                      style={{ width: "100%", height: "46px", display: "flex", alignItems: "center" }}
                    >
                      <div className="next-InputUnitName">
                        <input className="InputUnitName" type="text" placeholder="Unit name" />
                      </div>
                      <div className="next-createUnitBtn">
                        <Button title={"Create"} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="addUnitBtn">
                  <Button firstIcon={"+"} title={"Add Unit"} />
                </div>
              </div>
              <div className="addDayBtn">
                <Button firstIcon={"+"} title={"Add Day"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="timeAllocation" style={{ width: "18%" }}>
        <TimeAllocation />
      </div>
    </div>
  );
};

export default CreateOutline;
