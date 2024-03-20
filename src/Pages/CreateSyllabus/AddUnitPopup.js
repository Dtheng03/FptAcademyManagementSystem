import React from "react";

const AddUnitPopup = ({
  newUnitName,
  setNewUnitName,
  handleCreateUnit,
  setShowAddUnitPopup,
}) => {
  return (
    <div className="addUnitPopup">
      <h4 style={{ margin: "0", padding: "20px 0", textAlign: "center" }}>
        Create Unit
      </h4>
      <div className="enterUnitName">
        <input
          style={{
            width: "320px",
            height: "34px",
            margin: "3px",
            padding: "10px",
            border: "0.5px solid #d7cdcd",
            borderRadius: "7px",
          }}
          type="text"
          placeholder="Unit Name"
          value={newUnitName}
          onChange={(e) => setNewUnitName(e.target.value)}
        />
      </div>
      <div className="addSyllabusAction">
        <button className="createUnitBtn" onClick={handleCreateUnit}>Create</button>
        <button className="cancelUnitBtn" onClick={() => setShowAddUnitPopup(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default AddUnitPopup;
