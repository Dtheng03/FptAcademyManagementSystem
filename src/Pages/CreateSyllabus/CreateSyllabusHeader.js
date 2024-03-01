import React from "react";

const CreateSyllabusHeader = () => {
  return (
    <div style={{ width: "90%", padding: "20px" }}>
      <div
        className="general-header"
        style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}
      >
        <div className="syllabusName" style={{ display: "flex", alignItems: 'center' }}>
          <p className="subtitle1 headerTitle">Syllabus Name*</p>
          <input className="inputSyllabusName"/>
        </div>

        <div className="syllabusCode" style={{ display: "flex" }}>
          <p className="subtitle1 headerTitle" >
            Code
          </p>
          <p className="body2">NPL</p>
        </div>

        <div className="syllabusVersion" style={{ display: "flex" }}>
          <p className="subtitle1 headerTitle" >
            Version
          </p>
          <p className="body2">1.0</p>
        </div>
      </div>
    </div>
  );
};

export default CreateSyllabusHeader;
